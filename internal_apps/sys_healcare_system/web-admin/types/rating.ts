// Rating & Review Types

export interface Review {
    id: string;
    targetId: string; // Pharmacy or Pharmacist ID
    targetType: 'pharmacy' | 'pharmacist';
    targetName: string;
    userId: string;
    userName: string;
    userAvatar?: string;
    rating: number; // 1-5 stars
    comment: string;
    createdDate: string;
    status: 'pending' | 'approved' | 'rejected';
    helpful: number; // Số người thấy hữu ích
    response?: ReviewResponse;
}

export interface ReviewResponse {
    text: string;
    respondedBy: string;
    respondedDate: string;
}

export interface RatingStats {
    averageRating: number;
    totalReviews: number;
    ratingDistribution: {
        5: number;
        4: number;
        3: number;
        2: number;
        1: number;
    };
}

export interface ReviewSummary {
    pharmacyId?: string;
    pharmacistId?: string;
    stats: RatingStats;
    recentReviews: Review[];
    topReviews: Review[];
}

// Helper functions
export function calculateAverageRating(reviews: Review[]): number {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return Math.round((sum / reviews.length) * 10) / 10;
}

export function getRatingDistribution(reviews: Review[]): RatingStats['ratingDistribution'] {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(review => {
        distribution[review.rating as keyof typeof distribution]++;
    });
    return distribution;
}

export function getStarPercentage(count: number, total: number): number {
    if (total === 0) return 0;
    return Math.round((count / total) * 100);
}

export function formatRating(rating: number): string {
    return rating.toFixed(1);
}

export function getRatingColor(rating: number): string {
    if (rating >= 4.5) return 'text-green-600';
    if (rating >= 3.5) return 'text-blue-600';
    if (rating >= 2.5) return 'text-orange-600';
    return 'text-red-600';
}

export function getStarIcons(rating: number): string {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let stars = '★'.repeat(fullStars);
    if (hasHalfStar) stars += '⯨';
    stars += '☆'.repeat(5 - fullStars - (hasHalfStar ? 1 : 0));
    return stars;
}
