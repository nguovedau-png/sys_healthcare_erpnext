import { PrismaClient } from '../../../node_modules/@prisma/client-shop-service';

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding shop_db with premium content...');

    // Clear existing data to avoid duplicates/conflicts during re-seed
    await prisma.product.deleteMany({});
    await prisma.category.deleteMany({});

    // 1. Create Categories
    const categoriesData = [
        {
            slug: 'thuc-pham-chuc-nang',
            title: 'Thực phẩm chức năng',
            image: 'https://images.unsplash.com/photo-1550573105-09674661906c?auto=format&fit=crop&q=80&w=800',
            icon: 'flaticon-functional-food',
        },
        {
            slug: 'cham-soc-suc-khoe',
            title: 'Chăm sóc sức khỏe',
            image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&q=80&w=800',
            icon: 'flaticon-medical-equipment',
        },
        {
            slug: 'lam-dep',
            title: 'Làm đẹp',
            image: 'https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?auto=format&fit=crop&q=80&w=800',
            icon: 'flaticon-beauty-product',
        },
        {
            slug: 'me-va-be',
            title: 'Mẹ và bé',
            image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&q=80&w=800',
            icon: 'flaticon-mom-and-baby',
        },
        {
            slug: 'thiet-bi-y-te',
            title: 'Thiết bị y tế',
            image: 'https://images.unsplash.com/photo-1584982324634-b2931969aff9?auto=format&fit=crop&q=80&w=800',
            icon: 'flaticon-healthcare',
        }
    ];

    const categories: any = {};
    for (const cat of categoriesData) {
        categories[cat.slug] = await prisma.category.create({ data: cat });
    }

    // 2. Create Products
    const productsData = [
        // Category 1: Thực phẩm chức năng
        {
            slug: 'vitamin-c-1000mg',
            title: 'Viên uống Vitamin C 1000mg tăng sức đề kháng',
            image: 'https://images.unsplash.com/photo-1616670835145-8325855724a9?auto=format&fit=crop&q=80&w=800',
            price: 250000,
            originalPrice: 300000,
            discount: 17,
            isNew: true,
            isHot: true,
            isBestSelling: true,
            categoryId: categories['thuc-pham-chuc-nang'].id,
        },
        {
            slug: 'omega-3-krill-oil',
            title: 'Dầu cá Omega 3 Krill Oil cao cấp',
            image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&q=80&w=800',
            price: 450000,
            isHot: true,
            categoryId: categories['thuc-pham-chuc-nang'].id,
        },
        {
            slug: 'collagen-peptide',
            title: 'Bột Collagen Peptide trẻ hóa làn da',
            image: 'https://images.unsplash.com/photo-1626245917164-21bd2128c5aa?auto=format&fit=crop&q=80&w=800',
            price: 850000,
            originalPrice: 950000,
            discount: 10,
            isBestSelling: true,
            categoryId: categories['thuc-pham-chuc-nang'].id,
        },
        {
            slug: 'glucosamine-hcl',
            title: 'Glucosamine HCl 1500mg hỗ trợ xương khớp',
            image: 'https://images.unsplash.com/photo-1550573105-09674661906c?auto=format&fit=crop&q=80&w=800',
            price: 620000,
            categoryId: categories['thuc-pham-chuc-nang'].id,
        },

        // Category 2: Chăm sóc sức khỏe
        {
            slug: 'khau-trang-n95',
            title: 'Khẩu trang N95 kháng khuẩn gói 10 cái',
            image: 'https://images.unsplash.com/photo-1584622781564-1d9876a3e72a?auto=format&fit=crop&q=80&w=800',
            price: 150000,
            isBestSelling: true,
            categoryId: categories['cham-soc-suc-khoe'].id,
        },
        {
            slug: 'dung-dich-sat-khuan',
            title: 'Dung dịch sát khuẩn tay 500ml',
            image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800',
            price: 85000,
            categoryId: categories['cham-soc-suc-khoe'].id,
        },

        // Category 3: Làm đẹp
        {
            slug: 'serum-ha',
            title: 'Serum Hyaluronic Acid cấp ẩm sâu',
            image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800',
            price: 420000,
            isHot: true,
            categoryId: categories['lam-dep'].id,
        },
        {
            slug: 'kem-chong-nang-spf50',
            title: 'Kem chống nắng vật lý SPF 50+',
            image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=800',
            price: 320000,
            originalPrice: 380000,
            discount: 15,
            categoryId: categories['lam-dep'].id,
        },

        // Category 4: Mẹ và bé
        {
            slug: 'sua-bot-enfamil',
            title: 'Sữa bột Enfamil số 1 cho trẻ sơ sinh',
            image: 'https://images.unsplash.com/photo-1556228578-8c5c1f422943?auto=format&fit=crop&q=80&w=800',
            price: 560000,
            isBestSelling: true,
            categoryId: categories['me-va-be'].id,
        },
        {
            slug: 'bim-pampers-size-m',
            title: 'Bỉm Pampers lót siêu thấm Size M 66 miếng',
            image: 'https://images.unsplash.com/photo-1560364126-5386db9d7c88?auto=format&fit=crop&q=80&w=800',
            price: 380000,
            categoryId: categories['me-va-be'].id,
        },

        // Category 5: Thiết bị y tế
        {
            slug: 'may-do-huyet-ap-omron',
            title: 'Máy đo huyết áp Omron HEM-7121',
            image: 'https://images.unsplash.com/photo-1631815541254-aa400192138c?auto=format&fit=crop&q=80&w=800',
            price: 1250000,
            originalPrice: 1500000,
            discount: 16,
            isHot: true,
            isBestSelling: true,
            categoryId: categories['thiet-bi-y-te'].id,
        },
        {
            slug: 'nhiet-ke-hong-ngoai',
            title: 'Nhiệt kế hồng ngoại đo trán Microlife',
            image: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&q=80&w=800',
            price: 850000,
            categoryId: categories['thiet-bi-y-te'].id,
        }
    ];

    for (const p of productsData) {
        await prisma.product.create({ data: p });
    }

    console.log('✅ shop_db premium content seeded successfully!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
