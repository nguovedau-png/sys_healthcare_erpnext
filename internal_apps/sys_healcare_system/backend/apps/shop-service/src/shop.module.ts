import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma';
import { ShopController } from './shop.controller';
import { ShopService } from './shop.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
    ],
    controllers: [ShopController],
    providers: [PrismaService, ShopService],
})
export class ShopModule { }
