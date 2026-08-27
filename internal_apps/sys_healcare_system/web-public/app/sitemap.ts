import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://healthcare.example.com';

    // Static routes
    const routes = [
        '',
        '/search',
        '/shop',
        '/education',
        '/login',
        '/register',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // Dynamic routes (Mocked for now)
    // In real app, fetch from database (e.g. content-service, booking-service)
    const doctors = [1, 2, 3].map((id) => ({
        url: `${baseUrl}/search?doctor=${id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
    }));

    return [...routes, ...doctors];
}
