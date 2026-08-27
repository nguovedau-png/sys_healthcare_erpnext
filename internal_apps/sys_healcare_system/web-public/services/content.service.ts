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

export interface Disease {
    id: number;
    name: string;
    letter: string;
    description: string;
    category: string;
    specialist: string;
    severity: 'low' | 'medium' | 'high';
    icd10?: string;
    symptoms?: string;
    isActive: boolean;
}

export interface ElderService {
    id: number;
    title: string;
    description: string;
    icon: string;
    image?: string;
    features: string; // JSON string array
    price?: string;
    isActive: boolean;
    sortOrder: number;
}

export interface HealthcareEvent {
    id: number;
    title: string;
    description: string;
    image?: string;
    month: string;
    day: string;
    time: string;
    location: string;
    type: string;
    speakers: string; // JSON string array
    seats: number;
    booked: number;
    isActive: boolean;
    eventDate: string;
}


export interface HealthcarePackage {
    id: number;
    title: string;
    description?: string;
    image: string;
    category: string;
    price: number;
    originalPrice: number;
    discount: number;
    details: string; // JSON string array
    hospitalName: string;
    isActive: boolean;
    sortOrder: number;
}


class ContentService {
    // --- Posts ---

    async getPosts(params?: { page?: number; limit?: number; search?: string; category?: string; sortBy?: string }): Promise<{ data: Post[]; meta: any }> {
        const mockPosts: Post[] = [
            {
                id: 101,
                title: 'Chế độ dinh dưỡng vàng cho người cao tuổi trong mùa lạnh',
                content: 'Khi thời tiết chuyển lạnh, người cao tuổi cần chú trọng bổ sung các nhóm thực phẩm giúp tăng cường sức đề kháng...',
                desc: 'Hướng dẫn chi tiết cách chăm sóc sức khỏe và dinh dưỡng cho người già khi thời tiết thay đổi.',
                author: 'BS. Nguyễn Văn An',
                date: '2024-11-20',
                categoryId: 1,
                isActive: true,
                thumbnail: 'https://images.unsplash.com/photo-1581578731522-aa7721831776?auto=format&fit=crop&w=500&q=60',
                view: 1250
            },
            {
                id: 102,
                title: 'Công nghệ AI giúp phát hiện sớm ung thư vú với độ chính xác 98%',
                content: 'Các nhà khoa học vừa công bố một hệ thống AI mới có khả năng phân tích hình ảnh nhũ ảnh và phát hiện các dấu hiệu bất thường...',
                desc: 'Bước tiến mới của y học hiện đại trong việc ứng dụng trí tuệ nhân tạo để tầm soát và điều trị ung thư.',
                author: 'TS. Lê Minh Hoàng',
                date: '2024-11-19',
                categoryId: 2,
                isActive: true,
                thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=500&q=60',
                view: 3420
            },
            {
                id: 103,
                title: 'Dấu hiệu nhận biết sốt xuất huyết ở trẻ em và xử lý tại nhà',
                content: 'Sốt xuất huyết đang vào mùa cao điểm, phụ huynh cần đặc biệt lưu ý các triệu chứng sốt cao liên tục không hạ...',
                desc: 'Cảnh báo và hướng dẫn phụ huynh nhận biết sớm các dấu hiệu nguy hiểm của sốt xuất huyết ở trẻ nhỏ.',
                author: 'ThS.BS Trần Thu Hà',
                date: '2024-11-18',
                categoryId: 1,
                isActive: true,
                thumbnail: 'https://images.unsplash.com/photo-1584362946045-121f8af9214d?auto=format&fit=crop&w=500&q=60',
                view: 2150
            },
            {
                id: 104,
                title: '5 thói quen xấu buổi sáng đang âm thầm tàn phá dạ dày',
                content: 'Uống cà phê khi bụng đói hay bỏ bữa sáng là những thói quen phổ biến nhưng cực kỳ có hại cho hệ tiêu hóa...',
                desc: 'Chuyên gia tiêu hóa chỉ ra những sai lầm thường gặp vào buổi sáng có thể dẫn đến viêm loét dạ dày.',
                author: 'BS. Phan Anh Tuấn',
                date: '2024-11-17',
                categoryId: 1,
                isActive: true,
                thumbnail: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=500&q=60',
                view: 1890
            },
            {
                id: 105,
                title: 'Việt Nam triển khai tiêm chủng vaccine sốt xuất huyết lần đầu',
                content: 'Hệ thống tiêm chủng VNVC vừa chính thức triển khai tiêm vaccine phòng bệnh sốt xuất huyết cho trẻ em và người lớn...',
                desc: 'Thông tin quan trọng về loại vaccine mới giúp phòng ngừa căn bệnh nguy hiểm phổ biến tại Việt Nam.',
                author: 'Admin User',
                date: '2024-11-16',
                categoryId: 1,
                isActive: true,
                thumbnail: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=500&q=60',
                view: 5600
            },
            {
                id: 106,
                title: 'Stress kéo dài và mối liên hệ mật thiết với các bệnh tim mạch',
                content: 'Căng thẳng không chỉ ảnh hưởng đến tâm lý mà còn là nguyên nhân gián tiếp gây ra các cơn đau thắt ngực...',
                desc: 'Tìm hiểu cách quản lý cảm xúc để bảo vệ trái tim khỏe mạnh trong cuộc sống hiện đại áp lực.',
                author: 'BS.CKII Hoàng Nam',
                date: '2024-11-15',
                categoryId: 1,
                isActive: true,
                thumbnail: 'https://images.unsplash.com/photo-1559757175-30708f9b4f8c?auto=format&fit=crop&w=500&q=60',
                view: 2300
            }
        ];

        try {
            const res = await apiService.get('/content/posts', params) as any;
            if (res.data && res.data.length < 5 && !params?.search && !params?.category) {
                const needed = 5 - res.data.length;
                const fill = mockPosts.filter(mp => !res.data.find((p: any) => p.title === mp.title)).slice(0, needed);
                return { 
                    data: [...res.data, ...fill], 
                    meta: { ...res.meta, total: Math.max(res.meta.total, res.data.length + fill.length) } 
                };
            }
            return res;
        } catch (error) {
            console.warn('[ContentService] Failed to fetch posts, using mock data:', error);
            return { data: mockPosts.slice(0, params?.limit || 10), meta: { total: mockPosts.length } };
        }
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

    async getBanners(params?: { position?: string }): Promise<Banner[]> {
        return apiService.get('/content/banners', params);
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

    // --- Forum Topics (community-service) ---

    async getForumTopics(params?: { page?: number; limit?: number }): Promise<{ data: any[]; meta: any }> {
        return apiService.get('/community/forum/topics', params);
    }

    async getForumTopic(id: number): Promise<any> {
        return apiService.get(`/community/forum/topics/${id}`);
    }

    async createForumTopic(data: any): Promise<any> {
        return apiService.post('/community/forum/topics', data);
    }

    async createForumReply(topicId: number, content: string, authorId: string = 'user1', authorName: string = 'User'): Promise<any> {
        return apiService.post(`/community/forum/topics/${topicId}/replies`, { content, authorId, authorName });
    }

    // --- Topics (content-service legacy) ---

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

    // --- Diseases ---
    async getDiseases(params?: { letter?: string; search?: string }): Promise<Disease[]> {
        return apiService.get('/content/diseases', params);
    }

    async getDisease(id: string | number): Promise<Disease> {
        return apiService.get(`/content/diseases/${id}`);
    }

    // --- Elder Services ---
    async getElderServices(): Promise<ElderService[]> {
        return apiService.get('/content/elder-services');
    }

    // --- Events ---
    async getEvents(params?: { type?: string }): Promise<HealthcareEvent[]> {
        return apiService.get('/content/events', params);
    }

    async getEvent(id: string | number): Promise<HealthcareEvent> {
        return apiService.get(`/content/events/${id}`);
    }

    // --- Packages ---
    async getPackages(params?: { category?: string }): Promise<HealthcarePackage[]> {
        return apiService.get('/content/packages', params);
    }

    async getPackage(id: number): Promise<HealthcarePackage> {
        return apiService.get(`/content/packages/${id}`);
    }
}

export const contentService = new ContentService();
export default contentService;
