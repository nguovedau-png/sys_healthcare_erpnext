import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SettingService } from './setting.service';

@Controller()
export class SettingController {
    constructor(private readonly settingService: SettingService) { }

    @MessagePattern({ cmd: 'setting.findAll' })
    findAll() {
        return this.settingService.findAll();
    }

    @MessagePattern({ cmd: 'setting.findOne' })
    findOne(@Payload() id: number) {
        return this.settingService.findOne(id);
    }

    @MessagePattern({ cmd: 'setting.create' })
    create(@Payload() data: any) {
        return this.settingService.create(data);
    }

    @MessagePattern({ cmd: 'setting.update' })
    update(@Payload() payload: { id: number; data: any }) {
        return this.settingService.update(payload.id, payload.data);
    }

    @MessagePattern({ cmd: 'setting.remove' })
    remove(@Payload() id: number) {
        return this.settingService.remove(id);
    }
}
