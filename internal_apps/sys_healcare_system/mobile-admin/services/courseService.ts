// services/courseService.ts
import { apiRequest } from '../lib/api';

// Course types
export interface CourseImage {
    id: number;
    documentId: string;
    name: string;
    alternativeText?: string;
    caption?: string;
    width?: number;
    height?: number;
    formats?: any;
    hash?: string;
    ext?: string;
    mime?: string;
    size?: number;
    url: string;
    previewUrl?: string;
    provider?: string;
    provider_metadata?: any;
    createdAt?: string;
    updatedAt?: string;
    publishedAt?: string;
}

export interface CourseTopic {
    id: number;
    name: string;
    Content?: CourseContent[];
}

export interface CourseContent {
    id: number;
    name: string;
    description?: string;
    input?: string;
    output?: string;
    videoURL?: string;
}

export interface Course {
    id: number;
    documentId: string;
    Name: string;
    description?: string;
    type?: string;
    Images?: CourseImage[];
    Topics?: CourseTopic[];
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale?: string;
}

// Course Progress types
export interface CourseProgress {
    id: number;
    documentId: string;
    courseId: number;
    courseContentId: number;
    type: string;
    uid: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
}

// Generic API response types
export interface StrapiListResponse<T> {
    data: T[];
    meta?: any;
}

export interface StrapiSingleResponse<T> {
    data: T;
}

// Courses API - Content API endpoints (with /api prefix)
export const getCourses = async (token?: string | null): Promise<Course[]> => {
    const response = await apiRequest<StrapiListResponse<Course>>('/courses?populate=*', {
        token
    });
    return response.data;
};

export const getCourse = async (id: number, token?: string | null): Promise<Course> => {
    try {
        // Try to get the course with full population first
        const response = await apiRequest<StrapiSingleResponse<Course>>(`/courses/${id}?populate[Images][fields][0]=*&populate[Topics][populate][Content][fields][0]=*`, {
            token
        });
        return response.data;
    } catch (error) {
        console.warn('Failed to get detailed course info with populate, trying without populate:', error);
        try {
            // If that fails, get the basic course info
            const response = await apiRequest<StrapiSingleResponse<Course>>(`/courses/${id}`, {
                token
            });
            return response.data;
        } catch (fallbackError) {
            console.error('Both attempts to fetch course failed:', fallbackError);
            throw fallbackError;
        }
    }
};

export const createCourseProgress = async (progressData: Partial<CourseProgress>, token?: string | null): Promise<CourseProgress> => {
    const response = await apiRequest<StrapiSingleResponse<CourseProgress>>('/course-progresses', {
        method: 'POST',
        body: { data: { ...progressData } },
        token
    });
    return response.data;
};

export const getCourseProgress = async (userId: string, courseId: number, token?: string | null): Promise<CourseProgress[]> => {
    const response = await apiRequest<StrapiListResponse<CourseProgress>>(`/course-progresses?filters[uid][$eq]=${userId}&filters[courseId][$eq]=${courseId}`, {
        token
    });
    return response.data;
};