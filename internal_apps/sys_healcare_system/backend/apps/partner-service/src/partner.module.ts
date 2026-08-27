import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from '@app/common';
import { PrismaService } from './prisma';
import { PartnerController } from './partner.controller';
import { PartnerService } from './partner.service';
import { ElasticsearchModule } from '@nestjs/elasticsearch';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        CommonModule,
        ElasticsearchModule.registerAsync({
            useFactory: () => ({
                node: process.env.ELASTICSEARCH_URL || 'http://localhost:9200',
            }),
        }),
    ],
    controllers: [PartnerController],
    providers: [PrismaService, PartnerService],
})
export class PartnerModule { }
