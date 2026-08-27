import { apiService } from './api';

export interface Lecturer {
    id: string;
    name: string;
    title?: string;
    specialty?: string;
    avatar?: string;
    bio?: string;
}

export interface Lesson {
    id: string;
    courseId: string;
    title: string;
    content?: string;
    videoUrl?: string;
    order: number;
}

export interface Question {
    id: string;
    quizId: string;
    content: string;
    options: string | string[];
    correctOption: number;
}

export interface Quiz {
    id: string;
    courseId: string;
    title: string;
    questions?: Question[];
}

export interface Course {
    id: string;
    code: string;
    name: string;
    type: string;
    provider: string;
    credits: number;
    price: number;
    status: string;
    description?: string;
    thumbnail?: string;
    lecturerId: string;
    lecturer?: Lecturer;
    students?: number;
    lessons?: Lesson[];
    quizzes?: Quiz[];
}

export interface Enrollment {
    id: string;
    userId: string;
    courseId: string;
    course?: Course;
    status: string;
    progress: number;
    enrolledAt: string;
    completedAt?: string;
}

class EducationService {
    // --- Courses ---
    async getCourses(params?: any): Promise<{ data: Course[], meta: any }> {
        const response = await apiService.get<{ data: Course[], meta: any }>('/education/courses', params);
        return response;
    }

    async getCourse(id: string): Promise<Course> {
        const response = await apiService.get<Course>(`/education/courses/${id}`);
        return response;
    }

    async createCourse(data: Partial<Course>): Promise<Course> {
        const response = await apiService.post<Course>('/education/courses', data);
        return response;
    }

    async updateCourse(id: string, data: Partial<Course>): Promise<Course> {
        const response = await apiService.put<Course>(`/education/courses/${id}`, data);
        return response;
    }

    async deleteCourse(id: string): Promise<void> {
        await apiService.delete(`/education/courses/${id}`);
    }

    // --- Lecturers ---
    async getLecturers(): Promise<Lecturer[]> {
        const response = await apiService.get<Lecturer[]>('/education/lecturers');
        return response;
    }

    async createLecturer(data: Partial<Lecturer>): Promise<Lecturer> {
        const response = await apiService.post<Lecturer>('/education/lecturers', data);
        return response;
    }

    // --- Enrollments ---
    async getEnrollments(params?: any): Promise<{ data: Enrollment[], meta: any }> {
        const response = await apiService.get<{ data: Enrollment[], meta: any }>('/education/enrollments', params);
        return response;
    }

    async enrollUser(userId: string, courseId: string): Promise<Enrollment> {
        const response = await apiService.post<Enrollment>('/education/enrollments', { userId, courseId });
        return response;
    }

    // --- Quizzes ---
    async getQuizzes(courseId: string): Promise<any[]> {
        const response = await apiService.get<any[]>(`/education/quizzes/${courseId}`);
        return response;
    }

    // --- Analytics ---
    async getAnalytics(): Promise<any> {
        const response = await apiService.get<any>('/education/analytics');
        return response;
    }

    // --- Import ---
    async importStudents(data: any[]): Promise<any[]> {
        const response = await apiService.post<any[]>('/education/students/import', data);
        return response;
    }
}

export const educationService = new EducationService();
