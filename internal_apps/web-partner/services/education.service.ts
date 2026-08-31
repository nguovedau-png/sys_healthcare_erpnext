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
    async getCourses(params?: { page?: number; limit?: number; search?: string }): Promise<{ data: Course[]; meta: any }> {
        return await apiService.get('/education/courses', params);
    }

    async getCourse(id: string): Promise<Course> {
        return await apiService.get(`/education/courses/${id}`);
    }

    async createCourse(data: Partial<Course>): Promise<Course> {
        return await apiService.post('/education/courses', data);
    }

    async updateCourse(id: string, data: Partial<Course>): Promise<Course> {
        return await apiService.put(`/education/courses/${id}`, data);
    }

    async deleteCourse(id: string): Promise<void> {
        await apiService.delete(`/education/courses/${id}`);
    }

    // --- Lecturers ---
    async getLecturers(): Promise<Lecturer[]> {
        return await apiService.get('/education/lecturers');
    }

    async createLecturer(data: Partial<Lecturer>): Promise<Lecturer> {
        return await apiService.post('/education/lecturers', data);
    }

    // --- Enrollments ---
    async getEnrollments(userId?: string): Promise<Enrollment[]> {
        return await apiService.get('/education/enrollments', { userId });
    }

    async enrollUser(userId: string, courseId: string): Promise<Enrollment> {
        return await apiService.post('/education/enrollments', { userId, courseId });
    }

    // --- Quizzes ---
    async getQuizzes(courseId: string): Promise<any[]> {
        return await apiService.get(`/education/quizzes/${courseId}`);
    }
}

export const educationService = new EducationService();
export default educationService;
