import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from './prisma';

@Injectable()
export class ShopService {
    constructor(private readonly prisma: PrismaService) {}

    async getCategories() {
        return this.prisma.category.findMany();
    }

    async getProducts(params: { categoryId?: number, categorySlug?: string, isHot?: boolean, isBestSelling?: boolean }) {
        return this.prisma.product.findMany({
            where: {
                ...(params.categoryId && { categoryId: params.categoryId }),
                ...(params.categorySlug && { category: { slug: params.categorySlug } }),
                ...(params.isHot !== undefined && { isHot: params.isHot }),
                ...(params.isBestSelling !== undefined && { isBestSelling: params.isBestSelling }),
            },
            include: { category: true }
        });
    }
}
