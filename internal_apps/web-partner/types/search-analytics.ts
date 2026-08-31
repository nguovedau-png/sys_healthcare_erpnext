// Search Analytics Types

export interface SearchHashtag {
    id?: number;
    hashtag: string; // Hashtag (ASCII)
    hashtagVN: string; // Hashtag tiếng Việt
    times: number; // Số lần tìm kiếm
    createdDate: string; // Ngày tạo
    status: boolean; // Trạng thái (active/inactive)
}

export interface SearchKeyword {
    id?: number;
    keyword: string; // Keyword (ASCII)
    keywordVN: string; // Keyword tiếng Việt
    times: number; // Số lần tìm kiếm
    createdDate: string; // Ngày tạo
    status: boolean; // Trạng thái (active/inactive)
}

// Trending item (for both hashtag and keyword)
export interface TrendingItem {
    id: number;
    text: string;
    textVN: string;
    times: number;
    trend: 'up' | 'down' | 'stable';
    changePercent: number;
}

// Search analytics stats
export interface SearchAnalytics {
    totalSearches: number;
    uniqueKeywords: number;
    uniqueHashtags: number;
    avgSearchesPerDay: number;
    topKeywords: SearchKeyword[];
    topHashtags: SearchHashtag[];
    trendingKeywords: TrendingItem[];
    trendingHashtags: TrendingItem[];
}

// Helper functions
export function formatSearchCount(count: number): string {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toString();
}

export function calculateTrend(current: number, previous: number): 'up' | 'down' | 'stable' {
    if (current > previous) return 'up';
    if (current < previous) return 'down';
    return 'stable';
}

export function calculateChangePercent(current: number, previous: number): number {
    if (previous === 0) return 100;
    return Math.round(((current - previous) / previous) * 100);
}

export function getTopItems<T extends SearchHashtag | SearchKeyword>(
    items: T[],
    limit: number = 10
): T[] {
    return items
        .filter(item => item.status)
        .sort((a, b) => b.times - a.times)
        .slice(0, limit);
}

export function normalizeVietnamese(text: string): string {
    // Remove Vietnamese accents for ASCII version
    return text
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/Đ/g, 'D');
}
