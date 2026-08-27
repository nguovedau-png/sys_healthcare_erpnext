import { Controller, Get, Post, Put, Delete, Body, Param, Inject, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { PaginationDto } from '@app/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';

@ApiTags('Education')
@Controller('education')
export class EducationController {
    constructor(@Inject('EDUCATION_SERVICE') private readonly client: ClientProxy) { }

    // --- Courses ---

    @Get('courses')
    @ApiOperation({ summary: 'Get all courses with pagination and search' })
    @ApiQuery({ name: 'page', required: false, type: Number })
    @ApiQuery({ name: 'limit', required: false, type: Number })
    @ApiQuery({ name: 'search', required: false, type: String })
    getCourses(@Query() query: PaginationDto) {
        return this.client.send('get_courses', query);
    }

    @Get('courses/:id')
    async getCourse(@Param('id') id: string) {
        return firstValueFrom(this.client.send('get_course', id));
    }

    async createCourse(@Body() data: any) {
        return firstValueFrom(this.client.send('create_course', data));
    }

    @Put('courses/:id')
    async updateCourse(@Param('id') id: string, @Body() data: any) {
        return firstValueFrom(this.client.send('update_course', { id, data }));
    }

    @Delete('courses/:id')
    async deleteCourse(@Param('id') id: string) {
        return firstValueFrom(this.client.send('delete_course', id));
    }

    // --- Lecturers ---

    async getLecturers() {
        return firstValueFrom(this.client.send('get_lecturers', {}));
    }

    @Post('lecturers')
    async createLecturer(@Body() data: any) {
        return firstValueFrom(this.client.send('create_lecturer', data));
    }

    // --- Enrollments ---

    async getEnrollments(@Query() query: PaginationDto, @Query('userId') userId?: string) {
        return firstValueFrom(this.client.send('get_enrollments', { userId, query }));
    }

    async enrollUser(@Body() { userId, courseId }: { userId: string, courseId: string }) {
        return firstValueFrom(this.client.send('enroll_user', { userId, courseId }));
    }

    // --- Quizzes ---

    async getQuizzes(@Param('courseId') courseId: string) {
        return firstValueFrom(this.client.send('get_quizzes', courseId));
    }

    // --- Analytics ---

    async getAnalytics() {
        return firstValueFrom(this.client.send('get_analytics', {}));
    }

    // --- Import ---

    async importStudents(@Body() data: any[]) {
        return firstValueFrom(this.client.send('import_students', data));
    }
}
