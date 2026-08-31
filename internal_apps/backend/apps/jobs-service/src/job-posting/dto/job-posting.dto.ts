export class CreateJobPostingDto {
    pharmacyId: string;
    pharmacyName: string;
    position: string;
    description: string;
    requirements: string[];
    salary: string;
    location: string;
    type: 'full-time' | 'part-time' | 'contract';
}

export class UpdateJobPostingDto {
    position?: string;
    description?: string;
    requirements?: string[];
    salary?: string;
    location?: string;
    type?: 'full-time' | 'part-time' | 'contract';
    status?: 'open' | 'closed';
}
