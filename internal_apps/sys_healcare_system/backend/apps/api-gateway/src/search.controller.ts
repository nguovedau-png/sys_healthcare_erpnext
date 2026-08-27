import {
    Controller,
    Get,
    Post,
    Delete,
    Body,
    Query,
    Param,
    Inject,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('search')
export class SearchController {
    constructor(
        @Inject('SEARCH_SERVICE') private readonly searchClient: ClientProxy,
    ) { }

    @Get()
    async search(
        @Query('q') query: string,
        @Query('type') entityType?: string,
        @Query('limit') limit?: string,
    ) {
        return firstValueFrom(
            this.searchClient.send(
                { cmd: 'search.query' },
                {
                    query,
                    entityType: entityType?.toUpperCase(),
                    limit: limit ? parseInt(limit) : 20,
                },
            ),
        );
    }

    @Get('autocomplete')
    async autocomplete(
        @Query('q') query: string,
        @Query('type') entityType?: string,
    ) {
        return firstValueFrom(
            this.searchClient.send(
                { cmd: 'search.autocomplete' },
                {
                    query,
                    entityType: entityType?.toUpperCase(),
                    limit: 10,
                },
            ),
        );
    }

    @Get('entities')
    async getAllEntities(@Query('type') entityType?: string) {
        return firstValueFrom(
            this.searchClient.send(
                { cmd: 'search.getAll' },
                entityType?.toUpperCase(),
            ),
        );
    }

    @Post('index')
    async indexEntity(@Body() data: any) {
        return firstValueFrom(
            this.searchClient.send({ cmd: 'search.index' }, {
                entityType: data.entityType.toUpperCase(),
                entityId: data.entityId,
                name: data.name,
                data: data.data,
            }),
        );
    }

    @Delete(':type/:id')
    async deleteEntity(@Param('type') type: string, @Param('id') id: string) {
        return firstValueFrom(
            this.searchClient.send(
                { cmd: 'search.delete' },
                {
                    entityType: type.toUpperCase(),
                    entityId: id,
                },
            ),
        );
    }
}
