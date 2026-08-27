import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/portal/', '/login', '/register'],
        },
        sitemap: 'https://healthcare.example.com/sitemap.xml',
    };
}
