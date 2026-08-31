import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ContentService } from './content.service';
import { PaginationDto } from '@app/common';

@Controller()
export class ContentController {
    constructor(private readonly contentService: ContentService) { }

    @MessagePattern('getPosts')
    getPosts(@Payload() query: PaginationDto) {
        return this.contentService.getPosts(query);
    }

    @MessagePattern('getPost')
    getPost(@Payload() id: number) {
        return this.contentService.getPost(id);
    }

    @MessagePattern('createPost')
    createPost(@Payload() data: any) {
        return this.contentService.createPost(data);
    }

    @MessagePattern('updatePost')
    updatePost(@Payload() data: { id: number; postData: any }) {
        return this.contentService.updatePost(data.id, data.postData);
    }

    @MessagePattern('deletePost')
    deletePost(@Payload() id: number) {
        return this.contentService.deletePost(id);
    }

    @MessagePattern('getCategories')
    getCategories() {
        return this.contentService.getCategories();
    }

    @MessagePattern('createCategory')
    createCategory(@Payload() data: { name: string }) {
        return this.contentService.createCategory(data);
    }

    @MessagePattern('deleteCategory')
    deleteCategory(@Payload() id: number) {
        return this.contentService.deleteCategory(id);
    }

    @MessagePattern('getBanners')
    getBanners() {
        return this.contentService.getBanners();
    }

    @MessagePattern('createBanner')
    createBanner(@Payload() data: any) {
        return this.contentService.createBanner(data);
    }

    @MessagePattern('deleteBanner')
    deleteBanner(@Payload() id: number) {
        return this.contentService.deleteBanner(id);
    }

    @MessagePattern('getVideos')
    getVideos() {
        return this.contentService.getVideos();
    }

    @MessagePattern('createVideo')
    createVideo(@Payload() data: any) {
        return this.contentService.createVideo(data);
    }

    @MessagePattern('deleteVideo')
    deleteVideo(@Payload() id: number) {
        return this.contentService.deleteVideo(id);
    }

    @MessagePattern('getStaticPages')
    getStaticPages() {
        return this.contentService.getStaticPages();
    }

    @MessagePattern('createStaticPage')
    createStaticPage(@Payload() data: any) {
        return this.contentService.createStaticPage(data);
    }

    @MessagePattern('updateStaticPage')
    updateStaticPage(@Payload() data: { id: number; pageData: any }) {
        return this.contentService.updateStaticPage(data.id, data.pageData);
    }

    @MessagePattern('deleteStaticPage')
    deleteStaticPage(@Payload() id: number) {
        return this.contentService.deleteStaticPage(id);
    }

    @MessagePattern('getQuestions')
    getQuestions() {
        return this.contentService.getQuestions();
    }

    @MessagePattern('deleteQuestion')
    deleteQuestion(@Payload() id: number) {
        return this.contentService.deleteQuestion(id);
    }

    @MessagePattern('addAnswer')
    addAnswer(@Payload() data: { questionId: number; answerData: any }) {
        return this.contentService.addAnswer(data.questionId, data.answerData);
    }

    @MessagePattern('getTopics')
    getTopics() {
        return this.contentService.getTopics();
    }

    @MessagePattern('deleteTopic')
    deleteTopic(@Payload() id: number) {
        return this.contentService.deleteTopic(id);
    }

    @MessagePattern('getAllComments')
    getAllComments() {
        return this.contentService.getAllComments();
    }

    @MessagePattern('getComments')
    getComments(@Payload() data: { targetId: string; targetType: string }) {
        return this.contentService.getComments(data.targetId, data.targetType);
    }

    @MessagePattern('createComment')
    createComment(@Payload() data: any) {
        return this.contentService.createComment(data);
    }

    @MessagePattern('deleteComment')
    deleteComment(@Payload() id: number) {
        return this.contentService.deleteComment(id);
    }

    @MessagePattern('getTopSearches')
    getTopSearches() {
        return this.contentService.getTopSearches();
    }

    @MessagePattern('recordSearch')
    recordSearch(@Payload() keyword: string) {
        return this.contentService.recordSearch(keyword);
    }

    @MessagePattern('pushPostToBots')
    pushPostToBots(@Payload() data: { id: number; platforms: string[] }) {
        return this.contentService.pushPostToBots(data.id, data.platforms);
    }

    @MessagePattern('getDiseases')
    getDiseases(@Payload() query: any) {
        return this.contentService.getDiseases(query);
    }

    @MessagePattern('getDisease')
    getDisease(@Payload() id: number) {
        return this.contentService.getDisease(id);
    }

    @MessagePattern('getElderServices')
    getElderServices() {
        return this.contentService.getElderServices();
    }

    @MessagePattern('getEvents')
    getEvents(@Payload() query: any) {
        return this.contentService.getEvents(query);
    }

    @MessagePattern('getEvent')
    getEvent(@Payload() id: number) {
        return this.contentService.getEvent(id);
    }

    @MessagePattern('getPackages')
    getPackages(@Payload() query: any) {
        return this.contentService.getPackages(query);
    }

    @MessagePattern('getPackage')
    getPackage(@Payload() id: number) {
        return this.contentService.getPackage(id);
    }
}
