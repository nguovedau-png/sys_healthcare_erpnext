import { Body, Controller, Get, Post, Put, Delete, Param, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('roles')
export class RoleController {
    constructor(
        @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
    ) { }

    @Get()
    async getRoles() {
        return firstValueFrom(this.userClient.send({ cmd: 'getRoles' }, {}));
    }

    @Get(':id')
    async getRole(@Param('id') id: string) {
        return firstValueFrom(this.userClient.send({ cmd: 'getRole' }, parseInt(id)));
    }

    @Post()
    async createRole(@Body() body: any) {
        return firstValueFrom(this.userClient.send({ cmd: 'createRole' }, body));
    }

    @Put(':id')
    async updateRole(@Param('id') id: string, @Body() body: any) {
        return firstValueFrom(this.userClient.send({ cmd: 'updateRole' }, { id: parseInt(id), ...body }));
    }

    @Delete(':id')
    async deleteRole(@Param('id') id: string) {
        return firstValueFrom(this.userClient.send({ cmd: 'deleteRole' }, parseInt(id)));
    }
}
