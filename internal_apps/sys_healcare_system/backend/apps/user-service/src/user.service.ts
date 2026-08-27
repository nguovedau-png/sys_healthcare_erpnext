import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from './prisma';
import { User } from '@prisma/client-user-service';
import { PaginationDto, getPaginationOptions, createPaginatedResponse, buildSearchQuery } from '@app/common';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService implements OnModuleInit {
  constructor(private prisma: PrismaService) { }

  async onModuleInit() {
    console.log('User Service Initialized');
    await this.seedData();
  }

  private async seedData() {
    console.log('Seeding User Data...');
    const userCount = await this.prisma.user.count();
    console.log('Current User Count:', userCount);
    if (userCount === 0) {
      console.log('Inserting seed users...');
      // Create admin
      const adminPassword = await bcrypt.hash('123456', 10);
      await this.prisma.user.create({
        data: {
          userId: 'admin-001',
          email: 'admin@gmail.com',
          password: adminPassword,
          name: 'Hệ thống Admin',
          position: 'Administrator',
          department: 'IT',
        }
      });

      // Create some staff
      const staffPassword = await bcrypt.hash('password123', 10);
      await this.prisma.user.createMany({
        data: [
          {
            userId: 'staff-001',
            email: 'toi.nguyen@example.com',
            password: staffPassword,
            name: 'Nguyễn Tấn Tới',
            position: 'Bác sĩ chuyên khoa II',
            department: 'Khoa Nội tổng quát',
          },
          {
            userId: 'staff-002',
            email: 'lan.tran@example.com',
            password: staffPassword,
            name: 'Điều dưỡng Trần Lan',
            position: 'Điều dưỡng trưởng',
            department: 'Khoa Cấp cứu',
          },
          {
            userId: 'staff-003',
            email: 'nam.le@example.com',
            password: staffPassword,
            name: 'Lê Hoàng Nam',
            position: 'Bác sĩ chuyên khoa I',
            department: 'Khoa Nhi',
          }
        ]
      });
    }
  }

  async createUser(data: any): Promise<User> {
    const { password, ...userData } = data;
    const userId = userData.userId || uuidv4();
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.prisma.user.create({
      data: {
        ...userData,
        userId,
        password: hashedPassword,
      },
      include: {
        role: true,
      },
    });
  }

  async getUsers(query: PaginationDto) {
    const { skip, take, orderBy } = getPaginationOptions(query);
    const where = buildSearchQuery(query.search, 'email', 'firstName', 'lastName');

    const [data, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        include: {
          role: true,
        },
        skip,
        take,
        orderBy: orderBy || { createdAt: 'desc' },
      }),
      this.prisma.user.count({ where }),
    ]);

    return createPaginatedResponse(data, total, query);
  }

  async getUser(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        role: true,
      },
    });
  }

  async getUserById(userId: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { userId } });
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async updateUser(id: number, data: any): Promise<User> {
    const updateData = { ...data };
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }
    return this.prisma.user.update({
      where: { id },
      data: updateData,
      include: {
        role: true,
      },
    });
  }

  async deleteUser(id: number): Promise<User> {
    return this.prisma.user.delete({ where: { id } });
  }

  async createRole(data: any) {
    const { permissions, ...roleData } = data;

    return this.prisma.role.create({
      data: {
        ...roleData,
        permissions: permissions && permissions.length > 0 ? {
          connect: await this.getPermissionsByNames(permissions),
        } : undefined,
      },
      include: { permissions: true },
    });
  }

  async getRoles() {
    const roles = await this.prisma.role.findMany({
      include: { permissions: true },
    });

    // Transform permissions to array of permission names for frontend
    return roles.map(role => ({
      ...role,
      permissions: role.permissions.map(p => p.name),
    }));
  }

  async getRole(id: number) {
    const role = await this.prisma.role.findUnique({
      where: { id },
      include: { permissions: true },
    });

    if (!role) return null;

    // Transform permissions to array of permission names
    return {
      ...role,
      permissions: role.permissions.map(p => p.name),
    };
  }

  async updateRole(id: number, data: any) {
    const { permissions, ...roleData } = data;

    // If permissions are provided, update them
    const updateData: any = {
      ...roleData,
    };

    if (permissions !== undefined) {
      // First, disconnect all existing permissions
      await this.prisma.role.update({
        where: { id },
        data: {
          permissions: {
            set: [],
          },
        },
      });

      // Then connect the new permissions
      if (permissions.length > 0) {
        updateData.permissions = {
          connect: await this.getPermissionsByNames(permissions),
        };
      }
    }

    const updatedRole = await this.prisma.role.update({
      where: { id },
      data: updateData,
      include: { permissions: true },
    });

    // Transform permissions to array of permission names
    return {
      ...updatedRole,
      permissions: updatedRole.permissions.map(p => p.name),
    };
  }

  async deleteRole(id: number) {
    return this.prisma.role.delete({ where: { id } });
  }

  // Helper method to get permission IDs from permission names
  private async getPermissionsByNames(permissionNames: string[]) {
    const permissions = await this.prisma.permission.findMany({
      where: {
        name: {
          in: permissionNames,
        },
      },
    });

    return permissions.map(p => ({ id: p.id }));
  }
}
