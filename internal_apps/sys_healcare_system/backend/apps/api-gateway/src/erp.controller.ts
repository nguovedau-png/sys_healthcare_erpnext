import { Body, Controller, Get, Inject, Post, Query, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { ErpNextUpsertDto } from './dto/erpnext-upsert.dto';
import { ErpNextSyncGuard } from './guards/erpnext-sync.guard';
import { ErpNextSyncOperationsQueryDto } from './dto/erpnext-sync-query.dto';

@Controller('erp')
export class ErpController {
    constructor(
        @Inject('ERP_SERVICE') private readonly erpClient: ClientProxy,
    ) { }

    @Post()
    createApiKey(@Body() body: { userId: string; name: string }): Observable<any> {
        return this.erpClient.send({ cmd: 'erp.create' }, body);
    }

    @Get('ping')
    ping() {
        return { message: 'erp controller is alive' };
    }

    @Get('integrations/erpnext/health')
    erpNextHealth() {
        return this.erpClient.send({ cmd: 'erpnext.health' }, {});
    }

    @Post('integrations/erpnext/upsert')
    @UseGuards(ErpNextSyncGuard)
    upsertErpNext(@Body() document: ErpNextUpsertDto) {
        return this.erpClient.send({ cmd: 'erpnext.upsert' }, document);
    }

    @Get('integrations/erpnext/sync-operations')
    @UseGuards(ErpNextSyncGuard)
    listErpNextSyncOperations(@Query() query: ErpNextSyncOperationsQueryDto) {
        return this.erpClient.send({ cmd: 'erpnext.sync_operations' }, query);
    }

    @Get('integrations/erpnext/sync-operations/:id')
    @UseGuards(ErpNextSyncGuard)
    getErpNextSyncOperation(@Param('id') id: string, @Query('tenantId') tenantId: string) {
        return this.erpClient.send({ cmd: 'erpnext.sync_operation' }, { id, tenantId });
    }

    @Get('keys/:userId')
    getErpKeys(@Param('userId') userId: string) {
        return this.erpClient.send({ cmd: 'get_erp_keys' }, userId);
    }

    // --- Inventory ---
    @Get('inventory')
    getInventoryItems() {
        return this.erpClient.send({ cmd: 'get_inventory_items' }, {});
    }

    @Get('drug-reference')
    getDrugReferences(@Query('search') search?: string) {
        return this.erpClient.send({ cmd: 'get_drug_references' }, { search });
    }

    @Get('inventory/:id')
    getInventoryItem(@Param('id') id: string) {
        return this.erpClient.send({ cmd: 'get_inventory_item' }, parseInt(id));
    }

    @Post('inventory')
    createInventoryItem(@Body() data: any) {
        return this.erpClient.send({ cmd: 'create_inventory_item' }, data);
    }

    @Put('inventory/:id')
    updateInventoryItem(@Param('id') id: string, @Body() data: any) {
        return this.erpClient.send({ cmd: 'update_inventory_item' }, { id: parseInt(id), data });
    }

    @Delete('inventory/:id')
    deleteInventoryItem(@Param('id') id: string) {
        return this.erpClient.send({ cmd: 'delete_inventory_item' }, parseInt(id));
    }
}
