// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    devtools: {enabled: true},
    modules: ['@nuxtjs/tailwindcss', 'nuxt-security'],
    plugins: ["~/plugins/preline.client.ts"],
    runtimeConfig: {
        REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
        ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    },
    security: {
        strict: true,  // Lebih aman dengan strict mode
        headers: {
            crossOriginResourcePolicy: 'same-origin',
            crossOriginOpenerPolicy: 'same-origin',
            crossOriginEmbedderPolicy: 'credentialless',
            contentSecurityPolicy: {
                'default-src': ["'self'"],
                'base-uri': ["'none'"],
                'font-src': ["'self'", 'https:', 'data:'],
                'form-action': ["'self'"],
                'frame-ancestors': ["'self'"],
                'img-src': ["'self'", 'data:', 'https://', 'https://images.unsplash.com'],
                'object-src': ["'none'"],
                'script-src-attr': ["'none'"],
                'style-src': ["'self'", 'https:', "'unsafe-inline'"],
                'script-src': ["'self'", 'https:', "'unsafe-inline'", "'strict-dynamic'", "'nonce-{{nonce}}'"],
                'upgrade-insecure-requests': true,
                'connect-src': ["'self'", 'https://your-api-domain.com'],  // Sesuaikan dengan domain API kamu
                'worker-src': ["'self'"],
                'child-src': ["'none'"],
                'manifest-src': ["'self'"],
                'frame-src': ["'none'"],
                'media-src': ["'self'"]
            },
            originAgentCluster: '?1',
            referrerPolicy: 'strict-origin-when-cross-origin',
            strictTransportSecurity: {
                maxAge: 31536000,  // 1 tahun, lebih baik lebih panjang
                includeSubdomains: true,
                preload: true  // Jika diinginkan untuk di-preload oleh browser
            },
            xContentTypeOptions: 'nosniff',
            xDNSPrefetchControl: 'off',
            xDownloadOptions: 'noopen',
            xFrameOptions: 'SAMEORIGIN',
            xPermittedCrossDomainPolicies: 'none',
            xXSSProtection: '1; mode=block',  // Aktifkan perlindungan XSS
            permissionsPolicy: {
                camera: ['none'],
                'display-capture': ['none'],
                fullscreen: ['none'],
                geolocation: ['none'],
                microphone: ['none']
            }
        },
        requestSizeLimiter: {
            maxRequestSizeInBytes: 2000000,
            maxUploadFileRequestInBytes: 8000000,
            throwError: true
        },
        rateLimiter: {
            tokensPerInterval: 100,  // Sesuaikan rate limit
            interval: 60000,  // 1 menit per 100 request
            headers: false,
            driver: {
                name: 'lruCache'
            },
            throwError: true
        },
        xssValidator: {
            throwError: true
        },
        corsHandler: {
            origin: ['http://localhost:3000', 'https://dolan-lur.vercel.app/'],  // Tentukan domain yang diizinkan
            methods: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE'],
            preflight: {
                statusCode: 204
            },
        },
        allowedMethodsRestricter: {
            methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Batasi metode yang digunakan
            throwError: true
        },
        hidePoweredBy: true,  // Sembunyikan informasi tentang teknologi yang digunakan
        basicAuth: false,  // Jika tidak diperlukan, matikan Basic Auth
        enabled: true,  // Pastikan keamanan ini diaktifkan
        csrf: true,  // Aktifkan CSRF jika menggunakan form atau API POST
        nonce: true,  // Aktifkan penggunaan nonce untuk keamanan script
        removeLoggers: {
            external: [],
            consoleType: ['log', 'debug'],
            include: [/\.[jt]sx?$/, /\.vue\??/],
            exclude: [/node_modules/, /\.git/]
        },
        ssg: {
            meta: true,
            hashScripts: true,
            hashStyles: false,
            nitroHeaders: true,
            exportToPresets: true,
        },
        sri: true,  // Subresource Integrity untuk memastikan file eksternal tidak diubah
    }
})
