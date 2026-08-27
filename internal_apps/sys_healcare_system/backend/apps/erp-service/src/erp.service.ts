import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from './prisma';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ErpService implements OnModuleInit {
  constructor(private prisma: PrismaService) { }

  async onModuleInit() {
    console.log('ERP Service Initialized');
    await this.seedData();
  }

  private async seedData() {
    console.log('Seeding ERP Data...');
    const invCount = await this.prisma.inventoryItem.count();
    console.log('Current Inventory Count:', invCount);
    if (invCount === 0) {
      console.log('Inserting seed items...');
      await this.prisma.inventoryItem.createMany({
        data: [
          { name: "Panadol Extra", sku: "PAN-500", category: "Thuốc giảm đau", manufacturer: "GSK Global", price: 150000, stock: 120, minStock: 50, expiry: "12/2025", status: "In Stock" },
          { name: "Amoxicillin 500mg", sku: "AMO-500", category: "Kháng sinh", manufacturer: "DHG Pharma", price: 85000, stock: 45, minStock: 100, expiry: "06/2026", status: "Low Stock" },
          { name: "Vitamin C 1000mg", sku: "VIT-1000", category: "Thực phẩm chức năng", manufacturer: "Blackmores", price: 420000, stock: 0, minStock: 20, expiry: "N/A", status: "Out of Stock" },
          { name: "Gạc y tế tiệt trùng", sku: "GAC-YT", category: "Vật tư y tế", manufacturer: "Bảo Thạch", price: 12000, stock: 1500, minStock: 500, expiry: "N/A", status: "In Stock" },
        ]
      });
    }

    const drugCount = await this.prisma.drugReference.count();
    if (drugCount === 0) {
      await this.prisma.drugReference.createMany({
        data: [
          {
            name: 'Paracetamol 500mg',
            activeIngredient: 'Paracetamol',
            indications: 'Giảm đau, hạ sốt từ nhẹ đến vừa.',
            contraindications: 'Suy gan nặng, mẫn cảm với paracetamol.',
            dosage: 'Người lớn: 500mg-1000mg mỗi 4-6 giờ. Tối đa 4g/ngày.',
            sideEffects: 'Hiếm gặp: Ban đỏ, mề đay.',
            interactions: 'Rượu làm tăng độc tính trên gan.'
          },
          {
            name: 'Ibuprofen 400mg',
            activeIngredient: 'Ibuprofen',
            indications: 'Giảm đau, chống viêm trong các bệnh lý cơ xương khớp.',
            contraindications: 'Loét dạ dày tá tràng tiến triển, suy thận nặng.',
            dosage: '1 viên mỗi 6-8 giờ sau ăn.',
            sideEffects: 'Rối loạn tiêu hóa, đau dạ dày.',
            interactions: 'Warfarin làm tăng nguy cơ chảy máu.'
          },
          {
            name: 'Amoxicillin 500mg',
            activeIngredient: 'Amoxicillin',
            indications: 'Nhiễm khuẩn đường hô hấp, tiêu hóa, tiết niệu.',
            contraindications: 'Mẫn cảm với Penicillin.',
            dosage: '500mg mỗi 8 giờ.',
            sideEffects: 'Tiêu chảy, ngoại ban.',
            interactions: 'Làm giảm tác dụng của thuốc tránh thai đường uống.'
          },
          {
            name: 'Warfarin 2mg',
            activeIngredient: 'Warfarin',
            indications: 'Chống đông máu, dự phòng huyết khối.',
            contraindications: 'Chảy máu cấp tính, phụ nữ có thai.',
            dosage: 'Theo chỉ dẫn của bác sĩ dựa trên chỉ số INR.',
            sideEffects: 'Chảy máu dưới da, chảy máu lợi.',
            interactions: 'Ibuprofen làm tăng nguy cơ xuất huyết nghiêm trọng.'
          }
        ]
      });
    }
  }

  // --- Inventory ---
  async getInventoryItems() {
    return this.prisma.inventoryItem.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async getDrugReferences(search?: string) {
    return this.prisma.drugReference.findMany({
      where: search ? {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { activeIngredient: { contains: search, mode: 'insensitive' } }
        ]
      } : {},
      orderBy: { name: 'asc' },
    });
  }

  async getInventoryItem(id: number) {
    return this.prisma.inventoryItem.findUnique({ where: { id } });
  }

  async createInventoryItem(data: any) {
    return this.prisma.inventoryItem.create({ data });
  }

  async updateInventoryItem(id: number, data: any) {
    return this.prisma.inventoryItem.update({ where: { id }, data });
  }

  async deleteInventoryItem(id: number) {
    return this.prisma.inventoryItem.delete({ where: { id } });
  }

  // --- ERP Keys ---
  async createErpKey(userId: string, name: string) {
    const uuid = uuidv4().replace(/-/g, '');
    const key = `erpkey-${uuid}`;
    return this.prisma.erpKey.create({
      data: {
        key,
        name,
        userId,
      },
    });
  }

  async getErpKey(key: string) {
    return this.prisma.erpKey.findUnique({
      where: { key },
    });
  }

  async getErpKeys(userId: string) {
    return this.prisma.erpKey.findMany({
      where: { userId },
    });
  }

  async validateErpKey(key: string) {
    const erpKey = await this.getErpKey(key);
    return erpKey && erpKey.isActive;
  }

  async deactivateErpKey(key: string) {
    return this.prisma.erpKey.update({
      where: { key },
      data: { isActive: false },
    });
  }
}
