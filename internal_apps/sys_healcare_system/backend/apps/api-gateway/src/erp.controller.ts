import { Body, Controller, Get, Inject, Post, Query, Param, Put, Delete } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

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
