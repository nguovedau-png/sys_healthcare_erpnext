import { PaginationDto, PaginatedResult } from '../dto/pagination.dto';

export function getPaginationOptions(dto: PaginationDto) {
    const page = Number(dto.page) || 1;
    const limit = Number(dto.limit) || 10;
    const skip = (page - 1) * limit;

    return {
        skip,
        take: limit,
        orderBy: dto.sortBy ? { [dto.sortBy]: dto.sortOrder || 'desc' } : undefined,
    };
}

export function createPaginatedResponse<T>(data: T[], total: number, dto: PaginationDto): PaginatedResult<T> {
    const page = Number(dto.page) || 1;
    const limit = Number(dto.limit) || 10;
    const lastPage = Math.ceil(total / limit);

    return {
        data,
        meta: {
            total,
            page,
            lastPage,
            limit,
        },
    };
}

export function buildSearchQuery(search?: string, ...fields: string[]) {
    if (!search) return {};
    return {
        OR: fields.map((field) => ({
            [field]: { contains: search, mode: 'insensitive' },
        })),
    };
}
