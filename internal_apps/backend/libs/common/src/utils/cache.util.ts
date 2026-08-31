export class CacheUtil {
    private static readonly VERSION = 'v1';

    /**
     * Generates a versioned cache key
     * @param service Name of the service (e.g., 'partner', 'content')
     * @param resource Name of the resource (e.g., 'doctors', 'posts')
     * @param identifier Specific identifier or query params
     */
    static getInternalKey(service: string, resource: string, identifier: string | object): string {
        const idString = typeof identifier === 'string'
            ? identifier
            : JSON.stringify(identifier);

        return `${service}:${this.VERSION}:${resource}:${idString}`;
    }

    /**
     * Generates a pattern for mass deletion (if supported by cache store)
     */
    static getPattern(service: string, resource?: string): string {
        if (resource) {
            return `${service}:${this.VERSION}:${resource}:*`;
        }
        return `${service}:${this.VERSION}:*`;
    }
}
