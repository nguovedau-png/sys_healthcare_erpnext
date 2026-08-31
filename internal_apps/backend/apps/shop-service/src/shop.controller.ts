import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ShopService } from './shop.service';

@Controller()
export class ShopController {
    constructor(private readonly shopService: ShopService) { }

    @MessagePattern({ cmd: 'getCategories' })
    getCategories() {
        return this.shopService.getCategories();
    }

    @MessagePattern({ cmd: 'getProducts' })
    getProducts(payload: { categoryId?: number, categorySlug?: string, isHot?: boolean, isBestSelling?: boolean }) {
        return this.shopService.getProducts(payload || {});
    }
}
