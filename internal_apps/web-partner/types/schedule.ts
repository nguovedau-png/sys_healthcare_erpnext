// Schedule & Shift Management Types

export interface Shift {
    id: string;
    pharmacistId: string;
    pharmacistName: string;
    pharmacyId: string;
    pharmacyName: string;
    date: string;
    startTime: string;
    endTime: string;
    type: 'morning' | 'afternoon' | 'evening' | 'night';
    status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled';
    checkIn?: string;
    checkOut?: string;
    notes?: string;
}

export interface Schedule {
    id: string;
    pharmacyId: string;
    month: string; // YYYY-MM
    shifts: Shift[];
}

export interface Attendance {
    id: string;
    pharmacistId: string;
    month: string;
    totalShifts: number;
    completedShifts: number;
    lateCount: number;
    earlyLeaveCount: number;
    totalHours: number;
}

export type ShiftType = 'morning' | 'afternoon' | 'evening' | 'night';

export const SHIFT_TIMES: Record<ShiftType, { start: string; end: string }> = {
    morning: { start: '07:00', end: '12:00' },
    afternoon: { start: '12:00', end: '17:00' },
    evening: { start: '17:00', end: '22:00' },
    night: { start: '22:00', end: '07:00' }
};

// Helper functions
export function getShiftTypeText(type: ShiftType): string {
    const typeMap: Record<ShiftType, string> = {
        morning: 'Ca sáng',
        afternoon: 'Ca chiều',
        evening: 'Ca tối',
        night: 'Ca đêm'
    };
    return typeMap[type];
}

export function getShiftStatusColor(status: Shift['status']): string {
    const colorMap: Record<Shift['status'], string> = {
        scheduled: 'bg-blue-100 text-blue-700',
        confirmed: 'bg-green-100 text-green-700',
        completed: 'bg-gray-100 text-gray-700',
        cancelled: 'bg-red-100 text-red-700'
    };
    return colorMap[status];
}

export function calculateShiftHours(shift: Shift): number {
    const start = new Date(`2000-01-01 ${shift.startTime}`);
    const end = new Date(`2000-01-01 ${shift.endTime}`);
    const diff = end.getTime() - start.getTime();
    return diff / (1000 * 60 * 60);
}

export function isLateCheckIn(shift: Shift): boolean {
    if (!shift.checkIn) return false;
    const scheduled = new Date(`2000-01-01 ${shift.startTime}`);
    const actual = new Date(`2000-01-01 ${shift.checkIn}`);
    return actual > scheduled;
}

export function isEarlyCheckOut(shift: Shift): boolean {
    if (!shift.checkOut) return false;
    const scheduled = new Date(`2000-01-01 ${shift.endTime}`);
    const actual = new Date(`2000-01-01 ${shift.checkOut}`);
    return actual < scheduled;
}

export function getMonthDays(yearMonth: string): number {
    const [year, month] = yearMonth.split('-').map(Number);
    return new Date(year, month, 0).getDate();
}

export function formatTime(time: string): string {
    return time;
}
