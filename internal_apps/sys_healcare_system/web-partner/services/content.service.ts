import apiService from './api';

export interface Category {
    id: number;
    name: string;
}

export interface Post {
    id: number;
    title: string;
    categoryId: number;
    category?: string;
    content: string;
    desc: string;
    isActive: boolean;
    thumbnail: string;
    author: string;
    date: string;
    view: number;
}

export interface Comment {
    id: number;
    targetId: string;
    targetType: 'post' | 'question' | 'video';
    authorName: string;
    content: string;
    date: string;
    isActive: boolean;
}

export interface Question {
    id: number;
    title: string;
    content: string;
    authorName: string;
    category: string;
    date: string;
    isActive: boolean;
    isResolved: boolean;
    answers: Answer[];
}

export interface Answer {
    id: number;
    questionId: number;
    authorName: string;
    content: string;
    date: string;
}

export interface Topic {
    id: number;
    title: string;
    authorName: string;
    date: string;
    category: string;
    viewCount: number;
    commentCount: number;
    isActive: boolean;
}

export interface Banner {
    id: number;
    title: string;
    image: string;
    link: string;
    position: 'home_hero' | 'sidebar' | 'news_top';
    isActive: boolean;
}

export interface Video {
    id: number;
    title: string;
    url: string;
    thumbnail: string;
    duration: string;
    author: string;
    date: string;
    isActive: boolean;
}

export interface StaticPage {
    id: number;
    title: string;
    slug: string;
    content: string;
    isActive: boolean;
}

export interface TopSearchKeyword {
    id: number;
    keyword: string;
    count: number;
}

class ContentService {
    // --- Posts ---

    async getPosts(params?: { page?: number; limit?: number; search?: string; category?: string }): Promise<{ data: Post[]; meta: any }> {
        return apiService.get('/content/posts', params);
    }

    async getPost(id: string | number): Promise<Post> {
        return apiService.get(`/content/posts/${id}`);
    }

    async createPost(data: any): Promise<Post> {
        return apiService.post('/content/posts', data);
    }

    async updatePost(id: string | number, data: any): Promise<Post> {
        return apiService.put(`/content/posts/${id}`, data);
    }

    async deletePost(id: string | number): Promise<void> {
        await apiService.delete(`/content/posts/${id}`);
    }

    // --- Categories ---

    async getCategories(): Promise<Category[]> {
        return apiService.get('/content/categories');
    }

    async createCategory(name: string): Promise<Category> {
        return apiService.post('/content/categories', { name });
    }

    async deleteCategory(id: string | number): Promise<void> {
        await apiService.delete(`/content/categories/${id}`);
    }

    // --- Top Searches ---

    async getTopSearches(): Promise<TopSearchKeyword[]> {
        return apiService.get('/content/top-searches');
    }

    async createTopSearch(keyword: string, count: number): Promise<TopSearchKeyword> {
        return apiService.post('/content/top-searches', { keyword, count });
    }

    async updateTopSearch(id: string | number, data: any): Promise<TopSearchKeyword> {
        return apiService.put(`/content/top-searches/${id}`, data);
    }

    async deleteTopSearch(id: string | number): Promise<void> {
        await apiService.delete(`/content/top-searches/${id}`);
    }

    // --- Banners ---

    async getBanners(): Promise<Banner[]> {
        return apiService.get('/content/banners');
    }

    async createBanner(data: any): Promise<Banner> {
        return apiService.post('/content/banners', data);
    }

    async deleteBanner(id: string | number): Promise<void> {
        await apiService.delete(`/content/banners/${id}`);
    }

    // --- Videos ---

    async getVideos(): Promise<Video[]> {
        return apiService.get('/content/videos');
    }

    async createVideo(data: any): Promise<Video> {
        return apiService.post('/content/videos', data);
    }

    async deleteVideo(id: string | number): Promise<void> {
        await apiService.delete(`/content/videos/${id}`);
    }

    // --- Static Pages ---

    async getStaticPages(): Promise<StaticPage[]> {
        return apiService.get('/content/pages');
    }

    async createStaticPage(data: any): Promise<StaticPage> {
        return apiService.post('/content/pages', data);
    }

    async updateStaticPage(id: string | number, data: any): Promise<StaticPage> {
        return apiService.put(`/content/pages/${id}`, data);
    }

    async deleteStaticPage(id: string | number): Promise<void> {
        await apiService.delete(`/content/pages/${id}`);
    }

    // --- Questions & Answers ---

    async getQuestions(params?: { page?: number; limit?: number; search?: string }): Promise<{ data: Question[]; meta: any }> {
        return apiService.get('/content/questions', params);
    }

    async deleteQuestion(id: string | number): Promise<void> {
        await apiService.delete(`/content/questions/${id}`);
    }

    async addAnswer(questionId: string | number, authorName: string, content: string): Promise<Answer> {
        return apiService.post(`/content/questions/${questionId}/answers`, { authorName, content });
    }

    // --- Topics ---

    async getTopics(params?: { page?: number; limit?: number; search?: string }): Promise<{ data: Topic[]; meta: any }> {
        return apiService.get('/content/topics', params);
    }

    async deleteTopic(id: string | number): Promise<void> {
        await apiService.delete(`/content/topics/${id}`);
    }

    // --- Comments ---

    async getComments(targetId: string, targetType: 'post' | 'question' | 'video'): Promise<Comment[]> {
        return apiService.get('/content/comments', { targetId, targetType });
    }

    async getAllComments(): Promise<Comment[]> {
        return apiService.get('/content/comments');
    }

    async createComment(data: any): Promise<Comment> {
        return apiService.post('/content/comments', data);
    }

    async deleteComment(id: string | number): Promise<void> {
        await apiService.delete(`/content/comments/${id}`);
    }
}

export const contentService = new ContentService();
export default contentService;
