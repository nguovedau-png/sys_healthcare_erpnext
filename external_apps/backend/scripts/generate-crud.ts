import * as fs from 'fs';
import * as path from 'path';

// --- Types ---

interface Field {
    name: string;
    type: string;
    isOptional: boolean;
    isArray: boolean;
    attributes: string[];
    isId: boolean;
    isRelation: boolean;
    relationTo?: string; // Model name it relates to
    relationName?: string; // Relation name e.g. @relation("CreatedChannels")
}

interface Model {
    name: string;
    fields: Field[];
    mapName?: string; // @@map("table_name")
}

// --- Helpers ---

const toCamelCase = (str: string) => str.charAt(0).toLowerCase() + str.slice(1);
const toPascalCase = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
const toKebabCase = (str: string) => str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

// --- Parser ---

const parseSchema = (schemaPath: string): Model[] => {
    const content = fs.readFileSync(schemaPath, 'utf-8');
    const lines = content.split('\n');
    const models: Model[] = [];

    let currentModel: Model | null = null;
    let inModel = false;

    for (let line of lines) {
        line = line.trim();
        // Remove comments
        if (line.startsWith('//')) continue;
        const commentIndex = line.indexOf('//');
        if (commentIndex !== -1) line = line.substring(0, commentIndex).trim();

        if (line.startsWith('model ')) {
            const parts = line.split(/\s+/);
            const name = parts[1];
            currentModel = { name, fields: [] };
            inModel = true;
            continue;
        }

        if (inModel && line === '}') {
            if (currentModel) models.push(currentModel);
            currentModel = null;
            inModel = false;
            continue;
        }

        if (inModel && currentModel) {
            // Check for block attributes like @@map
            if (line.startsWith('@@map')) {
                const match = line.match(/"([^"]+)"/);
                if (match) currentModel.mapName = match[1];
                continue;
            }
            if (line.startsWith('@@')) continue;

            // Parse Field
            const parts = line.split(/\s+/);
            if (parts.length < 2) continue;

            const name = parts[0];
            let type = parts[1];

            const isOptional = type.endsWith('?');
            const isArray = type.endsWith('[]');
            type = type.replace('?', '').replace('[]', '');

            const attributes = parts.slice(2);

            const isId = attributes.some(attr => attr.startsWith('@id'));
            const isRelationAttr = attributes.some(attr => attr.startsWith('@relation'));

            let relationName: string | undefined;
            if (isRelationAttr) {
                const relAttr = attributes.find(attr => attr.startsWith('@relation'));
                if (relAttr) {
                    const match = relAttr.match(/"([^"]+)"/);
                    if (match) relationName = match[1];
                }
            }

            currentModel.fields.push({
                name,
                type,
                isOptional,
                isArray,
                attributes,
                isId,
                isRelation: false,
                relationName,
                relationTo: type
            });
        }
    }

    // Pass 2: Identify Relations properly
    const modelNames = new Set(models.map(m => m.name));
    for (const model of models) {
        for (const field of model.fields) {
            if (modelNames.has(field.type)) {
                field.isRelation = true;
            } else {
                field.relationTo = undefined;
            }
        }
    }

    return models;
};

// --- Generators ---

const generateBackend = (model: Model, outputDir: string) => {
    const modelName = model.name;
    const modelNameCamel = toCamelCase(modelName);
    const modelNamePascal = toPascalCase(modelName);
    const dbNameCamel = toCamelCase(modelName);

    // 1. Controller
    const controllerContent = `
import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma';

export class ${modelNamePascal}Controller {
    static async create(req: Request, res: Response) {
        try {
            const data = req.body;
            const ${modelNameCamel} = await prisma.${dbNameCamel}.create({ data });
            res.status(201).json({ success: true, data: ${modelNameCamel} });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    static async findAll(req: Request, res: Response) {
        try {
            const { page = 1, limit = 20 } = req.query;
            const skip = (Number(page) - 1) * Number(limit);
            
            const [total, items] = await Promise.all([
                prisma.${dbNameCamel}.count(),
                prisma.${dbNameCamel}.findMany({
                    skip,
                    take: Number(limit),
                    orderBy: { createdAt: 'desc' },
                })
            ]);

            res.json({
                success: true,
                data: items,
                pagination: {
                    total,
                    page: Number(page),
                    limit: Number(limit),
                    totalPages: Math.ceil(total / Number(limit))
                }
            });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    static async findOne(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const ${modelNameCamel} = await prisma.${dbNameCamel}.findUnique({ where: { id } });
            if (!${modelNameCamel}) return res.status(404).json({ success: false, message: 'Not found' });
            res.json({ success: true, data: ${modelNameCamel} });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data = req.body;
            const ${modelNameCamel} = await prisma.${dbNameCamel}.update({ where: { id }, data });
            res.json({ success: true, data: ${modelNameCamel} });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await prisma.${dbNameCamel}.delete({ where: { id } });
            res.json({ success: true, message: 'Deleted successfully' });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
}
`;

    const moduleDir = path.join(outputDir, 'src/modules', toKebabCase(modelName));
    if (!fs.existsSync(moduleDir)) fs.mkdirSync(moduleDir, { recursive: true });

    fs.writeFileSync(path.join(moduleDir, `${toKebabCase(modelName)}.controller.ts`), controllerContent.trim());

    // 2. Routes
    const routesContent = `
import { Router } from 'express';
import { ${modelNamePascal}Controller } from './${toKebabCase(modelName)}.controller';
import { authenticate } from '../../middlewares/auth.middleware';
import { authorize } from '../../middlewares/rbac.middleware';

const router = Router();

router.post('/', authenticate, authorize(['${modelName}'], 'create'), ${modelNamePascal}Controller.create);
router.get('/', authenticate, authorize(['${modelName}'], 'read'), ${modelNamePascal}Controller.findAll);
router.get('/:id', authenticate, authorize(['${modelName}'], 'read'), ${modelNamePascal}Controller.findOne);
router.patch('/:id', authenticate, authorize(['${modelName}'], 'update'), ${modelNamePascal}Controller.update);
router.delete('/:id', authenticate, authorize(['${modelName}'], 'delete'), ${modelNamePascal}Controller.delete);

export default router;
`;
    fs.writeFileSync(path.join(moduleDir, `${toKebabCase(modelName)}.routes.ts`), routesContent.trim());
    console.log(`✅ Backend Generated: ${moduleDir}`);
};

const generateWebAdmin = (model: Model, outputDir: string) => {
    const modelName = model.name;
    const modelNamePascal = toPascalCase(modelName);
    const moduleName = toKebabCase(modelName);

    const fields = model.fields.filter(f => !['id', 'createdAt', 'updatedAt', 'isDeleted'].includes(f.name));

    const tableColumns = fields.map(f => {
        if (f.type === 'Boolean') {
            return `        { title: '${toPascalCase(f.name)}', dataIndex: '${f.name}', key: '${f.name}', render: (val: boolean) => val ? 'Yes' : 'No' },`;
        }
        return `        { title: '${toPascalCase(f.name)}', dataIndex: '${f.name}', key: '${f.name}' },`;
    }).join('\n');

    const formItems = fields.map(f => {
        let input = `<Input placeholder="${f.name}" />`;
        if (f.type === 'Boolean') input = `<Switch />`;
        if (f.type === 'Int' || f.type === 'Float' || f.type === 'Decimal') input = `<InputNumber style={{ width: '100%' }} />`;

        return `
                    <Form.Item name="${f.name}" label="${toPascalCase(f.name)}" rules={[{ required: ${!f.isOptional} }]}>
                        ${input}
                    </Form.Item>`;
    }).join('');

    const pageContent = `
import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, InputNumber, Switch, message, Popconfirm, Card } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import api from '../../../services/api';

const ${modelNamePascal}Page = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<any>(null);
    const [form] = Form.useForm();

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await api.get('/${moduleName}s');
            if (res.data.success) setItems(res.data.data);
        } catch (error) {
            message.error('Failed to fetch data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, []);

    const handleSave = async (values: any) => {
        try {
            if (editingItem) {
                await api.patch(\`/${moduleName}s/\${editingItem.id}\`, values);
                message.success('Updated successfully');
            } else {
                await api.post('/${moduleName}s', values);
                message.success('Created successfully');
            }
            setIsModalOpen(false);
            form.resetFields();
            setEditingItem(null);
            fetchData();
        } catch (error) {
            message.error('Operation failed');
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await api.delete(\`/${moduleName}s/\${id}\`);
            message.success('Deleted successfully');
            fetchData();
        } catch (error) {
            message.error('Delete failed');
        }
    };

    const columns = [
${tableColumns}
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record: any) => (
                <div style={{ display: 'flex', gap: 8 }}>
                    <Button icon={<EditOutlined />} size="small" onClick={() => { setEditingItem(record); form.setFieldsValue(record); setIsModalOpen(true); }} />
                    <Popconfirm title="Delete?" onConfirm={() => handleDelete(record.id)}>
                        <Button danger icon={<DeleteOutlined />} size="small" />
                    </Popconfirm>
                </div>
            )
        }
    ];

    return (
        <Card title="${modelNamePascal} Management" extra={<Button type="primary" icon={<PlusOutlined />} onClick={() => { setEditingItem(null); form.resetFields(); setIsModalOpen(true); }}>Add New</Button>}>
            <Table dataSource={items} columns={columns} rowKey="id" loading={loading} />
            
            <Modal title={editingItem ? 'Edit' : 'Create'} open={isModalOpen} onCancel={() => setIsModalOpen(false)} onOk={form.submit}>
                <Form form={form} layout="vertical" onFinish={handleSave}>
${formItems}
                </Form>
            </Modal>
        </Card>
    );
};

export default ${modelNamePascal}Page;
`;

    const pagesDir = path.join(outputDir, 'src/modules/generated');
    if (!fs.existsSync(pagesDir)) fs.mkdirSync(pagesDir, { recursive: true });

    fs.writeFileSync(path.join(pagesDir, `${modelNamePascal}.tsx`), pageContent.trim());
    console.log(`✅ Web Admin Page Generated: ${path.join(pagesDir, `${modelNamePascal}.tsx`)}`);
};

const generateMobile = (model: Model, outputDir: string) => {
    const modelName = model.name;
    const modelNamePascal = toPascalCase(modelName);
    const moduleName = toKebabCase(modelName);

    const fields = model.fields.filter(f => !['id', 'createdAt', 'updatedAt', 'isDeleted', 'password'].includes(f.name));
    const firstField = fields[0]?.name || 'id';
    const subField = fields[1]?.name;

    const screenContent = `
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, RefreshControl, Alert } from 'react-native';
import api from '../../../services/api';
import { Plus, Trash2 } from 'lucide-react-native';

const ${modelNamePascal}Screen = () => {
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await api.get('/${moduleName}s');
            if (res.data.success) setItems(res.data.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, []);

    const handleDelete = (id: string) => {
        Alert.alert('Details', 'Delete this item?', [
            { text: 'Cancel', style: 'cancel' },
            { 
                text: 'Delete', 
                style: 'destructive',
                onPress: async () => {
                    try {
                        await api.delete(\`/${moduleName}s/\${id}\`);
                        fetchData();
                    } catch (e) { Alert.alert('Error', 'Failed to delete'); }
                }
            }
        ]);
    };

    const renderItem = ({ item }: { item: any }) => (
        <View style={styles.item}>
            <View style={{ flex: 1 }}>
                <Text style={styles.title}>{item.${firstField}}</Text>
                ${subField ? `<Text style={styles.subtitle}>{item.${subField}}</Text>` : ''}
            </View>
            <TouchableOpacity onPress={() => handleDelete(item.id)}>
                <Trash2 size={20} color="#ff4d4f" />
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>${modelNamePascal}s</Text>
            </View>
            <FlatList
                data={items}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchData} />}
                contentContainerStyle={styles.list}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5' },
    header: { padding: 16, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#eee' },
    headerTitle: { fontSize: 20, fontWeight: 'bold' },
    list: { padding: 16 },
    item: { 
        backgroundColor: 'white', 
        padding: 16, 
        borderRadius: 8, 
        marginBottom: 12, 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 2, elevation: 1
    },
    title: { fontSize: 16, fontWeight: '600', color: '#333' },
    subtitle: { fontSize: 14, color: '#666', marginTop: 4 }
});

export default ${modelNamePascal}Screen;
`;

    const screensDir = path.join(outputDir, 'src/modules/generated/screens');
    if (!fs.existsSync(screensDir)) fs.mkdirSync(screensDir, { recursive: true });

    fs.writeFileSync(path.join(screensDir, `${modelNamePascal}Screen.tsx`), screenContent.trim());
    console.log(`✅ Mobile Screen Generated: ${path.join(screensDir, `${modelNamePascal}Screen.tsx`)}`);
};

const updateSeed = (model: Model, rootDir: string) => {
    const seedPath = path.join(rootDir, 'prisma/seed.ts');
    if (!fs.existsSync(seedPath)) {
        console.warn('⚠️ seed.ts not found.');
        return;
    }

    let content = fs.readFileSync(seedPath, 'utf-8');
    const modelName = toKebabCase(model.name).replace(/-/g, '_'); // user_profile

    // Regex to find RESOURCES array
    // const RESOURCES = ['user', ...];
    const resourceRegex = /const RESOURCES = \[([\s\S]*?)\];/;
    const match = content.match(resourceRegex);

    if (match) {
        const currentResources = match[1];
        if (!currentResources.includes(`'${modelName}'`)) {
            const updatedResources = currentResources.trim() ? `${currentResources}, '${modelName}'` : `'${modelName}'`;
            content = content.replace(resourceRegex, `const RESOURCES = [${updatedResources}];`);
            fs.writeFileSync(seedPath, content);
            console.log(`✅ Updated seed.ts: Added '${modelName}' to RESOURCES.`);
            console.log(`👉 PLEASE RUN: npm run seed (to create permissions in DB)`);
        } else {
            console.log(`ℹ️ seed.ts already contains '${modelName}'.`);
        }
    } else {
        console.warn('⚠️ Could not parse RESOURCES in seed.ts');
    }
};

// --- Execution ---

const main = () => {
    try {
        const schemaPath = path.join(__dirname, '../prisma/schema.prisma');
        const rootDir = path.join(__dirname, '..'); // backend root
        const targetModelName = process.argv[2];

        console.log(`Parsing schema...`);
        const models = parseSchema(schemaPath);

        if (!targetModelName) {
            console.log(`Usage: npx ts-node generate-crud.ts <ModelName>`);
            console.log(`Available Models: ${models.map(m => m.name).join(', ')}`);
            return;
        }

        const model = models.find(m => m.name === targetModelName);
        if (!model) {
            console.error(`Model '${targetModelName}' not found.`);
            return;
        }

        console.log(`Generating code for: ${model.name}`);

        generateBackend(model, rootDir);
        updateSeed(model, rootDir);

        const webAdminRoot = path.join(rootDir, '../web-admin');
        if (fs.existsSync(webAdminRoot)) {
            generateWebAdmin(model, webAdminRoot);
        }

        const mobileRoot = path.join(rootDir, '../mobile-app');
        if (fs.existsSync(mobileRoot)) {
            generateMobile(model, mobileRoot);
        }

    } catch (error) {
        console.error('Error generating code:', error);
    }
};

main();
