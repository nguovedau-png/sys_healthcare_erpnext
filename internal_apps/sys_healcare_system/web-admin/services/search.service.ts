import apiService from './api';

export type EntityType = 'DOCTOR' | 'CLINIC' | 'HOSPITAL' | 'PHARMACY' | 'PHARMACIST';

export interface SearchResult {
    id: string;
    score: number;
    entityType: EntityType;
    entityId: string;
    name: string;
    [key: string]: any;
}

export interface SearchEntity {
    id: number;
    entityType: EntityType;
    entityId: string;
    name: string;
    data: any;
    createdAt: string;
    updatedAt: string;
}

class SearchService {
    async search(query: string, type?: EntityType, limit: number = 20): Promise<SearchResult[]> {
        const params: any = { q: query, limit };
        if (type) params.type = type;
        return apiService.get<SearchResult[]>('/search', params);
    }

    async autocomplete(query: string, type?: EntityType): Promise<string[]> {
        const params: any = { q: query };
        if (type) params.type = type;
        return apiService.get<string[]>('/search/autocomplete', params);
    }

    async getAllEntities(type?: EntityType): Promise<SearchEntity[]> {
        const params = type ? { type } : undefined;
        return apiService.get<SearchEntity[]>('/search/entities', params);
    }

    async indexEntity(data: {
        entityType: EntityType;
        entityId: string;
        name: string;
        data: any;
    }): Promise<SearchEntity> {
        return apiService.post<SearchEntity>('/search/index', data);
    }

    async deleteEntity(type: EntityType, id: string): Promise<void> {
        return apiService.delete(`/search/${type}/${id}`);
    }
}

export const searchService = new SearchService();
export default searchService;
