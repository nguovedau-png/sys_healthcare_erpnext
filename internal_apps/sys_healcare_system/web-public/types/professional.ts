// Professional Education and Work Experience Types

export interface ProfessionalEducation {
    id?: number;
    studiedAt: string; // Nơi học
    startDate: string; // Ngày bắt đầu
    endDate: string | null; // Ngày kết thúc (null nếu đang học)
    speciality: string; // Chuyên ngành
    degree: string; // Bằng cấp
    userId: string; // User ID
}

export interface WorkExperience {
    id?: number;
    workplace: string; // Nơi làm việc
    startDate: string; // Ngày bắt đầu
    endDate: string | null; // Ngày kết thúc (null nếu đang làm)
    career: string; // Nghề nghiệp/Vị trí
    location: string; // Địa điểm
    title: string; // Chức danh
    userId: string; // User ID
}

// Degree types
export type DegreeType =
    | 'Dược sĩ đại học'
    | 'Dược sĩ cao đẳng'
    | 'Thạc sĩ Dược học'
    | 'Tiến sĩ Dược học'
    | 'Cử nhân'
    | 'Khác';

// Career/Position types
export type CareerType =
    | 'Dược sĩ'
    | 'Dược sĩ chính'
    | 'Dược sĩ trưởng'
    | 'Trưởng phòng'
    | 'Giám đốc'
    | 'Tư vấn viên'
    | 'Khác';

// Speciality types
export type SpecialityType =
    | 'Dược lâm sàng'
    | 'Dược học cổ truyền'
    | 'Dược công nghiệp'
    | 'Hóa dược'
    | 'Dược lý học'
    | 'Kiểm nghiệm dược'
    | 'Quản lý dược'
    | 'Khác';

// Helper functions
export function calculateYearsOfExperience(experiences: WorkExperience[]): number {
    let totalMonths = 0;

    experiences.forEach(exp => {
        const start = new Date(exp.startDate);
        const end = exp.endDate ? new Date(exp.endDate) : new Date();
        const months = (end.getFullYear() - start.getFullYear()) * 12 +
            (end.getMonth() - start.getMonth());
        totalMonths += months;
    });

    return Math.floor(totalMonths / 12);
}

export function formatDateRange(startDate: string, endDate: string | null): string {
    const start = new Date(startDate).toLocaleDateString('vi-VN', { month: '2-digit', year: 'numeric' });
    const end = endDate
        ? new Date(endDate).toLocaleDateString('vi-VN', { month: '2-digit', year: 'numeric' })
        : 'Hiện tại';
    return `${start} - ${end}`;
}

export function isCurrentPosition(endDate: string | null): boolean {
    return endDate === null;
}

export function getHighestDegree(educations: ProfessionalEducation[]): string {
    const degreeRanking: Record<string, number> = {
        'Tiến sĩ Dược học': 5,
        'Thạc sĩ Dược học': 4,
        'Dược sĩ đại học': 3,
        'Dược sĩ cao đẳng': 2,
        'Cử nhân': 1,
        'Khác': 0
    };

    let highest = 'Chưa có';
    let highestRank = -1;

    educations.forEach(edu => {
        const rank = degreeRanking[edu.degree] || 0;
        if (rank > highestRank) {
            highestRank = rank;
            highest = edu.degree;
        }
    });

    return highest;
}
