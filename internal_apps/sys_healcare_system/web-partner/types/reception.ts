export interface QueueTicket {
    id: string;
    number: number; // Số thứ tự (1001, 1002...)
    patientName: string;
    dob?: string;
    serviceType: 'insurance' | 'service' | 'priority' | 'others';
    status: 'waiting' | 'called' | 'triaged' | 'serving' | 'completed' | 'skipped';
    issueTime: string;
    estimatedTime?: string;
    counter?: string; // Quầy phục vụ
}

export interface TriageRecord {
    id: string;
    ticketId: string;
    patientName: string;
    vitals: {
        temp: number;
        pulse: number;
        bp: string;
        sp02: number;
        weight: number;
        height: number;
    };
    symptoms: string; // Triệu chứng ban đầu
    priority: 'red' | 'yellow' | 'green' | 'blue'; // Phân loại cấp cứu
    nurseNote?: string;
    triageTime: string;
    assignedDoctorId?: string;
    assignedDepartment?: string;
}

export const MOCK_QUEUE: QueueTicket[] = [
    { id: 'q1', number: 1001, patientName: 'Nguyễn Văn A', serviceType: 'insurance', status: 'serving', issueTime: '2024-12-20T07:30:00Z', counter: 'Quầy 1' },
    { id: 'q2', number: 1002, patientName: 'Trần Thị B', serviceType: 'service', status: 'called', issueTime: '2024-12-20T07:35:00Z', counter: 'Quầy 2' },
    { id: 'q3', number: 1003, patientName: 'Lê Văn C', serviceType: 'priority', status: 'waiting', issueTime: '2024-12-20T07:40:00Z' },
    { id: 'q4', number: 1004, patientName: 'Phạm Thị D', serviceType: 'insurance', status: 'waiting', issueTime: '2024-12-20T07:45:00Z' },
];
