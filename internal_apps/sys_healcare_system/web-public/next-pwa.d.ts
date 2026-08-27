declare module 'next-pwa' {
    import { NextConfig } from 'next';
    interface PWAConfig {
        disable?: boolean;
        dest?: string;
        register?: boolean;
        scope?: string;
        sw?: string;
        maximumFileSizeToCacheInBytes?: number;
        [key: string]: any;
    }
    function withPWA(config: PWAConfig): (nextConfig: NextConfig) => any;
    export default withPWA;
}