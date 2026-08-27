export class CreateJobApplicationDto {
    jobPostingId: string;
    pharmacistId: string;
    pharmacistName: string;
    pharmacistAvatar?: string;
    pharmacyId: string;
    pharmacyName: string;
    position: string;
    cvUrl: string;
    coverLetter?: string;
}

export class UpdateJobApplicationDto {
    status?: 'pending' | 'reviewed' | 'interviewed' | 'accepted' | 'rejected';
    notes?: string;
    reviewedDate?: Date;
}
