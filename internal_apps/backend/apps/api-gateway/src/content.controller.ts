import { Controller, Get, Post, Put, Delete, Body, Param, Inject, Query, Patch } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { PaginationDto } from '@app/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';

@ApiTags('Content')
@Controller('content')
export class ContentController {
    constructor(@Inject('CONTENT_SERVICE') private readonly client: ClientProxy) { }

    // Posts (Triggered reload)
    @Get('posts')
    @ApiOperation({ summary: 'Get all posts with pagination and search' })
    @ApiQuery({ name: 'page', required: false, type: Number })
    @ApiQuery({ name: 'limit', required: false, type: Number })
    @ApiQuery({ name: 'search', required: false, type: String })
    getPosts(@Query() query: PaginationDto) {
        return this.client.send('getPosts', query);
    }

    @Get('posts/:id')
    async getPost(@Param('id') id: string) {
        return firstValueFrom(this.client.send('getPost', parseInt(id)));
    }

    @Post('posts')
    async createPost(@Body() data: any) {
        return firstValueFrom(this.client.send('createPost', data));
    }

    @Put('posts/:id')
    async updatePost(@Param('id') id: string, @Body() data: any) {
        return firstValueFrom(this.client.send('updatePost', { id: parseInt(id), postData: data }));
    }

    @Delete('posts/:id')
    async deletePost(@Param('id') id: string) {
        return firstValueFrom(this.client.send('deletePost', parseInt(id)));
    }

    // Categories
    @Get('categories')
    async getCategories() {
        return firstValueFrom(this.client.send('getCategories', {}));
    }

    @Post('categories')
    async createCategory(@Body() data: { name: string }) {
        return firstValueFrom(this.client.send('createCategory', data));
    }

    @Delete('categories/:id')
    async deleteCategory(@Param('id') id: string) {
        return firstValueFrom(this.client.send('deleteCategory', parseInt(id)));
    }

    // Banners
    @Get('banners')
    async getBanners(@Query('position') position: string) {
        return firstValueFrom(this.client.send('getBanners', { position }));
    }

    @Post('banners')
    async createBanner(@Body() data: any) {
        return firstValueFrom(this.client.send('createBanner', data));
    }

    @Delete('banners/:id')
    async deleteBanner(@Param('id') id: string) {
        return firstValueFrom(this.client.send('deleteBanner', parseInt(id)));
    }

    // Videos
    @Get('videos')
    async getVideos() {
        return firstValueFrom(this.client.send('getVideos', {}));
    }

    @Post('videos')
    async createVideo(@Body() data: any) {
        return firstValueFrom(this.client.send('createVideo', data));
    }

    @Delete('videos/:id')
    async deleteVideo(@Param('id') id: string) {
        return firstValueFrom(this.client.send('deleteVideo', parseInt(id)));
    }

    // Static Pages
    @Get('pages')
    async getStaticPages() {
        return firstValueFrom(this.client.send('getStaticPages', {}));
    }

    @Post('pages')
    async createStaticPage(@Body() data: any) {
        return firstValueFrom(this.client.send('createStaticPage', data));
    }

    @Put('pages/:id')
    async updateStaticPage(@Param('id') id: string, @Body() data: any) {
        return firstValueFrom(this.client.send('updateStaticPage', { id: parseInt(id), pageData: data }));
    }

    @Delete('pages/:id')
    async deleteStaticPage(@Param('id') id: string) {
        return firstValueFrom(this.client.send('deleteStaticPage', parseInt(id)));
    }

    // Q&A
    @Get('questions')
    @ApiOperation({ summary: 'Get all questions with pagination and search' })
    @ApiQuery({ name: 'page', required: false, type: Number })
    @ApiQuery({ name: 'limit', required: false, type: Number })
    @ApiQuery({ name: 'search', required: false, type: String })
    getQuestions(@Query() query: PaginationDto) {
        return this.client.send('getQuestions', query);
    }

    @Delete('questions/:id')
    async deleteQuestion(@Param('id') id: string) {
        return firstValueFrom(this.client.send('deleteQuestion', parseInt(id)));
    }

    @Patch('questions/:id/answer')
    async addAnswer(@Param('id') id: string, @Body() data: any) {
        return firstValueFrom(this.client.send('addAnswer', { questionId: parseInt(id), answerData: data }));
    }

    // Topics
    @Get('topics')
    async getTopics() {
        return firstValueFrom(this.client.send('getTopics', {}));
    }

    @Delete('topics/:id')
    async deleteTopic(@Param('id') id: string) {
        return firstValueFrom(this.client.send('deleteTopic', parseInt(id)));
    }

    // Comments
    @Get('comments')
    async getComments(@Query('targetId') targetId: string, @Query('targetType') targetType: string) {
        if (targetId && targetType) {
            return firstValueFrom(this.client.send('getComments', { targetId, targetType }));
        }
        return firstValueFrom(this.client.send('getAllComments', {}));
    }

    @Post('comments')
    async createComment(@Body() data: any) {
        return firstValueFrom(this.client.send('createComment', data));
    }

    @Delete('comments/:id')
    async deleteComment(@Param('id') id: string) {
        return firstValueFrom(this.client.send('deleteComment', parseInt(id)));
    }

    // Top Search
    @Get('top-searches')
    async getTopSearches() {
        return firstValueFrom(this.client.send('getTopSearches', {}));
    }

    @Post('posts/:id/push')
    async pushPostToBots(@Param('id') id: string, @Body() data: { platforms: string[] }) {
        return firstValueFrom(this.client.send('pushPostToBots', { id: parseInt(id), platforms: data.platforms }));
    }

    // Diseases
    @Get('diseases')
    @ApiOperation({ summary: 'Get all diseases, optionally filtered by letter or search' })
    @ApiQuery({ name: 'letter', required: false, type: String })
    @ApiQuery({ name: 'search', required: false, type: String })
    getDiseases(@Query() query: any) {
        return firstValueFrom(this.client.send('getDiseases', query));
    }

    @Get('diseases/:id')
    getDisease(@Param('id') id: string) {
        return firstValueFrom(this.client.send('getDisease', parseInt(id)));
    }

    // Elder Services
    @Get('elder-services')
    @ApiOperation({ summary: 'Get all elder care services' })
    getElderServices() {
        return firstValueFrom(this.client.send('getElderServices', {}));
    }

    // Events
    @Get('events')
    @ApiOperation({ summary: 'Get all healthcare events' })
    @ApiQuery({ name: 'type', required: false, type: String })
    getEvents(@Query() query: any) {
        return firstValueFrom(this.client.send('getEvents', query));
    }

    @Get('events/:id')
    getEvent(@Param('id') id: string) {
        return firstValueFrom(this.client.send('getEvent', parseInt(id)));
    }

    // Packages (Triggered reload)
    @Get('packages')
    @ApiOperation({ summary: 'Get all healthcare packages' })
    @ApiQuery({ name: 'category', required: false, type: String })
    getPackages(@Query() query: any) {
        return firstValueFrom(this.client.send('getPackages', query));
    }

    @Get('packages/:id')
    getPackage(@Param('id') id: string) {
        return firstValueFrom(this.client.send('getPackage', parseInt(id)));
    }
}
