import { Body, Controller, Get, Inject, Post, Query, Param, Put, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { ErpNextUpsertDto } from './dto/erpnext-upsert.dto';
import { ErpNextSyncGuard } from './guards/erpnext-sync.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ErpNextSyncOperationsQueryDto } from './dto/erpnext-sync-query.dto';

@Controller('erp')
export class ErpController {
    constructor(
        @Inject('ERP_SERVICE') private readonly erpClient: ClientProxy,
    ) { }

    @Post()
    @UseGuards(JwtAuthGuard)
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
    @UseGuards(JwtAuthGuard)
    getErpKeys(@Param('userId') userId: string) {
        return this.erpClient.send({ cmd: 'get_erp_keys' }, userId);
    }

    // --- Inventory ---
    @Get('inventory')
    @UseGuards(JwtAuthGuard)
    getInventoryItems() {
        return this.erpClient.send({ cmd: 'get_inventory_items' }, {});
    }

    @Get('drug-reference')
    @UseGuards(JwtAuthGuard)
    getDrugReferences(@Query('search') search?: string) {
        return this.erpClient.send({ cmd: 'get_drug_references' }, { search });
    }

    @Get('inventory/:id')
    @UseGuards(JwtAuthGuard)
    getInventoryItem(@Param('id', ParseIntPipe) id: number) {
        return this.erpClient.send({ cmd: 'get_inventory_item' }, id);
    }

    @Post('inventory')
    @UseGuards(JwtAuthGuard)
    createInventoryItem(@Body() data: Record<string, unknown>) {
        return this.erpClient.send({ cmd: 'create_inventory_item' }, data);
    }

    @Put('inventory/:id')
    @UseGuards(JwtAuthGuard)
    updateInventoryItem(@Param('id', ParseIntPipe) id: number, @Body() data: Record<string, unknown>) {
        return this.erpClient.send({ cmd: 'update_inventory_item' }, { id, data });
    }

    @Delete('inventory/:id')
    @UseGuards(JwtAuthGuard)
    deleteInventoryItem(@Param('id', ParseIntPipe) id: number) {
        return this.erpClient.send({ cmd: 'delete_inventory_item' }, id);
    }
}
