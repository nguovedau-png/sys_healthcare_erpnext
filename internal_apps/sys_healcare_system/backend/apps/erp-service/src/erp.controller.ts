import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ErpService } from './erp.service';
import { ErpNextIntegrationService } from './integrations/erpnext.integration.service';
import { ErpNextDocument } from './integrations/erpnext.types';

@Controller()
export class ErpController {
  constructor(
    private readonly erpService: ErpService,
    private readonly erpNext: ErpNextIntegrationService,
  ) { }

  @MessagePattern({ cmd: 'erp.create' })
  createErpKey(@Payload() data: { userId: string; name: string }) {
    return this.erpService.createErpKey(data.userId, data.name);
  }

  @MessagePattern({ cmd: 'erp.validate' })
  validateErpKey(@Payload() key: string) {
    return this.erpService.validateErpKey(key);
  }

  @MessagePattern({ cmd: 'erp.deactivate' })
  deactivateErpKey(@Payload() key: string) {
    return this.erpService.deactivateErpKey(key);
  }

  @MessagePattern({ cmd: 'get_erp_keys' })
  getErpKeys(userId: string) {
    return this.erpService.getErpKeys(userId);
  }

  @MessagePattern({ cmd: 'erpnext.health' })
  erpNextHealth() {
    return this.erpNext.getHealth();
  }

  @MessagePattern({ cmd: 'erpnext.upsert' })
  upsertErpNext(@Payload() document: ErpNextDocument) {
    if (!document?.doctype || !document?.context?.tenantId || !document?.context?.facilityId || !document?.context?.idempotencyKey) {
      throw new Error('doctype, tenantId, facilityId and idempotencyKey are required');
    }
    return this.erpNext.upsert(document);
  }

  // --- Inventory ---
  @MessagePattern({ cmd: 'get_inventory_items' })
  getInventoryItems() {
    return this.erpService.getInventoryItems();
  }

  @MessagePattern({ cmd: 'get_drug_references' })
  getDrugReferences(data: { search?: string }) {
    return this.erpService.getDrugReferences(data.search);
  }

  @MessagePattern({ cmd: 'get_inventory_item' })
  getInventoryItem(id: number) {
    return this.erpService.getInventoryItem(id);
  }

  @MessagePattern({ cmd: 'create_inventory_item' })
  createInventoryItem(data: any) {
    return this.erpService.createInventoryItem(data);
  }

  @MessagePattern({ cmd: 'update_inventory_item' })
  updateInventoryItem(payload: { id: number, data: any }) {
    return this.erpService.updateInventoryItem(payload.id, payload.data);
  }

  @MessagePattern({ cmd: 'delete_inventory_item' })
  deleteInventoryItem(id: number) {
    return this.erpService.deleteInventoryItem(id);
  }
}
