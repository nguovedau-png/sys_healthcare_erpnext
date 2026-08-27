import { Controller, Get, Query, Inject, Version, VERSION_NEUTRAL } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('shop')
export class ShopController {
    constructor(
        @Inject('SHOP_SERVICE') private readonly shopClient: ClientProxy,
    ) { }

    @Get('categories')
    getCategories() {
        return firstValueFrom(this.shopClient.send({ cmd: 'getCategories' }, {}));
    }

    @Get('products')
    getProducts(
        @Query('categoryId') categoryId?: string,
        @Query('categorySlug') categorySlug?: string,
        @Query('isHot') isHot?: string,
        @Query('isBestSelling') isBestSelling?: string,
    ) {
        return firstValueFrom(this.shopClient.send({ cmd: 'getProducts' }, {
            ...(categoryId && { categoryId: parseInt(categoryId) }),
            ...(categorySlug && { categorySlug }),
            ...(isHot !== undefined && { isHot: isHot === 'true' }),
            ...(isBestSelling !== undefined && { isBestSelling: isBestSelling === 'true' }),
        }));
    }
}
