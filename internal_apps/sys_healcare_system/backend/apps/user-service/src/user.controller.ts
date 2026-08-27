import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';
import { User } from '@prisma/client-user-service';
import { PaginationDto } from '@app/common';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) { }

  @MessagePattern({ cmd: 'createUser' })
  createUser(@Payload() data: any): Promise<User> {
    return this.userService.createUser(data);
  }

  @MessagePattern({ cmd: 'getUsers' })
  getUsers(@Payload() query: PaginationDto) {
    return this.userService.getUsers(query);
  }

  @MessagePattern({ cmd: 'getUser' })
  getUser(@Payload() id: number): Promise<User | null> {
    return this.userService.getUser(id);
  }

  @MessagePattern({ cmd: 'getUserById' })
  getUserById(@Payload() id: string): Promise<User> {
    // @ts-ignore
    return this.userService.getUserById(id);
  }

  @MessagePattern({ cmd: 'getUserByEmail' })
  getUserByEmail(@Payload() email: string): Promise<User> {
    // @ts-ignore
    return this.userService.getUserByEmail(email);
  }

  @MessagePattern({ cmd: 'updateUser' })
  updateUser(@Payload() data: any): Promise<User> {
    const { id, ...userData } = data;
    return this.userService.updateUser(id, userData);
  }

  @MessagePattern({ cmd: 'deleteUser' })
  deleteUser(@Payload() id: number): Promise<User> {
    return this.userService.deleteUser(id);
  }

  @MessagePattern({ cmd: 'createRole' })
  createRole(@Payload() data: any) {
    return this.userService.createRole(data);
  }

  @MessagePattern({ cmd: 'getRoles' })
  getRoles() {
    return this.userService.getRoles();
  }

  @MessagePattern({ cmd: 'getRole' })
  getRole(@Payload() id: number) {
    return this.userService.getRole(id);
  }

  @MessagePattern({ cmd: 'updateRole' })
  updateRole(@Payload() data: any) {
    const { id, ...roleData } = data;
    return this.userService.updateRole(id, roleData);
  }

  @MessagePattern({ cmd: 'deleteRole' })
  deleteRole(@Payload() id: number) {
    return this.userService.deleteRole(id);
  }
}
