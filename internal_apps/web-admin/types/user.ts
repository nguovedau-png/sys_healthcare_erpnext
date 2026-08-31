export interface EcosystemUser {
    Id: string; // uniqueidentifier
    UserName: string;
    Password?: string; // nvarchar(128) - Optional for frontend
    PasswordSalt?: string;
    Email: string;
    PasswordQuestion?: string;
    PasswordAnswer?: string;
    IsApproved: boolean;
    IsLockedOut: boolean;
    IsBanned: boolean;
    CreateDate: string; // datetime
    LastLoginDate: string;
    LastPasswordChangedDate: string;
    LastLockoutDate: string;
    LastActivityDate?: string;
    FailedPasswordAttemptCount: number;
    FailedPasswordAnswerAttempt: number;
    PasswordResetToken?: string;
    PasswordResetTokenCreatedAt?: string;
    Comment?: string;
    Slug: string;
    Signature?: string;
    Age?: number;
    Location?: string;
    Website?: string;
    Twitter?: string;
    Facebook?: string;
    Avatar?: string;
    FacebookAccessToken?: string;
    FacebookId?: number; // bigint
    TwitterAccessToken?: string;
    TwitterId?: string;
    GoogleAccessToken?: string;
    GoogleId?: string;
    MicrosoftAccessToken?: string;
    MicrosoftId?: string;
    IsExternalAccount?: boolean;
    TwitterShowFeed?: boolean;
    LoginIdExpires?: string;
    MiscAccessToken?: string;
    DisableEmailNotifications?: boolean;
    DisablePosting?: boolean;
    DisablePrivateMessages?: boolean;
    DisableFileUploads?: boolean;
    HasAgreedToTermsAndConditions?: boolean;
    Latitude?: string;
    Longitude?: string;
    Phone?: string;
    FullName?: string;
    BirthDay?: string; // datetime
    Noisinh?: string;
    Address?: string;
    Nhommau?: string;
    Chieucao?: number; // real
    Cannang?: number; // real
    SystemSource?: string;
    IsDoctor: boolean;
    IsUploadAvatarWeb: boolean;
    IsPartner: boolean;
    KeyCodeActive?: string;
    IdCardNo?: string;
    PlaceOfIssuance?: string;
    DateOfIssuance?: string;
    Token?: string;
    Code?: string;
    ImageDegree?: string;
}

export function getUserStatusText(user: EcosystemUser): string {
    if (user.IsBanned) return 'Đã bị cấm';
    if (user.IsLockedOut) return 'Đã khóa';
    if (!user.IsApproved) return 'Chờ duyệt';
    return 'Hoạt động';
}

export function getUserStatusColor(user: EcosystemUser): string {
    if (user.IsBanned) return 'bg-red-100 text-red-700';
    if (user.IsLockedOut) return 'bg-orange-100 text-orange-700';
    if (!user.IsApproved) return 'bg-yellow-100 text-yellow-700';
    return 'bg-green-100 text-green-700';
}
