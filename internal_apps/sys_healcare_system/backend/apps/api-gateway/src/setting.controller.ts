import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    Inject,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('settings')
export class SettingController {
    constructor(
        @Inject('SETTING_SERVICE') private readonly settingClient: ClientProxy,
    ) { }

    @Get()
    async findAll() {
        return firstValueFrom(
            this.settingClient.send({ cmd: 'setting.findAll' }, {}),
        );
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return firstValueFrom(
            this.settingClient.send({ cmd: 'setting.findOne' }, parseInt(id)),
        );
    }

    @Post()
    async create(@Body() data: any) {
        return firstValueFrom(
            this.settingClient.send({ cmd: 'setting.create' }, data),
        );
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() data: any) {
        return firstValueFrom(
            this.settingClient.send({ cmd: 'setting.update' }, { id: parseInt(id), data }),
        );
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return firstValueFrom(
            this.settingClient.send({ cmd: 'setting.remove' }, parseInt(id)),
        );
    }
}
