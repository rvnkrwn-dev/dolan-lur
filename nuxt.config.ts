// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    devtools: {enabled: true},
    modules: ['@nuxtjs/tailwindcss', 'nuxt-security'],
    plugins: ["~/plugins/preline.client.ts"],
    runtimeConfig: {
        REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
        ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
        CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
        CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
        CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    },
    security: {
        // Pengaturan untuk CORS
        corsHandler: {
            // Daftar asal yang diizinkan untuk mengakses API dan sumber daya sensitif
            origin: ['http://localhost:3000', 'https://dolan-lur.vercel.app'],
            methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Metode HTTP yang diizinkan
            allowHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],  // Header yang diizinkan
            exposeHeaders: ['X-Custom-Header'],  // Header yang dapat diakses oleh browser
            preflight: {
                statusCode: 204  // Status code untuk permintaan preflight CORS
            },
        },
        // Pengaturan untuk headers keamanan
        headers: {
            contentSecurityPolicy: {
                'default-src': ["'self'"],  // Hanya izinkan konten dari domain yang sama
                'base-uri': ["'none'"],  // Tidak ada URL dasar
                'font-src': ["'self'", 'https:', 'data:'],  // Izinkan font dari domain yang diizinkan
                'form-action': ["'self'"],  // Izinkan formulir hanya dikirim ke domain yang sama
                'frame-ancestors': ["'self'"],  // Tidak ada iframe dari sumber lain
                'img-src': ["'self'", 'data:', 'blob:', 'http://localhost:3000', 'https://images.unsplash.com', 'https://cdn.paradisotour.co.id', 'https://ayukjalan.com', 'https://res.cloudinary.com'],  // Izinkan gambar dari domain yang diizinkan
                'object-src': ["'none'"],  // Tidak izinkan objek seperti Flash
                'script-src': ["'self'", 'https:', "'unsafe-inline'", "'strict-dynamic'", "'nonce-{{nonce}}'"],  // Izinkan skrip dari domain yang aman
                'upgrade-insecure-requests': true,  // Paksakan penggunaan HTTPS
                'connect-src': ["'self'", 'https://api.example.com'],  // Izinkan API dari domain yang diizinkan
                'worker-src': ["'self'"],  // Izinkan web workers dari domain yang sama
                'child-src': ["'none'"],  // Tidak izinkan child frame atau workers
            },
            crossOriginResourcePolicy: 'same-origin',  // Mengatur kebijakan CORS untuk sumber daya
            crossOriginOpenerPolicy: 'same-origin',  // Mencegah jendela baru dapat mengakses jendela utama
            crossOriginEmbedderPolicy: 'credentialless',  // Kebijakan untuk embedding sumber daya cross-origin
            xContentTypeOptions: 'nosniff',  // Mencegah sniffing jenis konten
            strictTransportSecurity: {
                maxAge: 31536000,  // 1 tahun (pengaturan untuk HSTS)
                includeSubdomains: true,  // Terapkan HSTS pada semua subdomain
                preload: true  // Mengizinkan preload HSTS
            },
            xDNSPrefetchControl: 'off',  // Menonaktifkan DNS prefetch
            xDownloadOptions: 'noopen',  // Menonaktifkan pengunduhan file yang tidak sah
            xFrameOptions: 'SAMEORIGIN',  // Menyatakan bahwa halaman hanya bisa di-iframe oleh domain yang sama
            xPermittedCrossDomainPolicies: 'none',  // Menonaktifkan kebijakan cross-domain
            xXSSProtection: '1; mode=block',  // Mengaktifkan perlindungan XSS di browser
            permissionsPolicy: {
                camera: ['none'],  // Tidak ada akses kamera
                'display-capture': ['none'],  // Tidak ada akses untuk menangkap layar
                fullscreen: ['none'],  // Tidak ada akses fullscreen
                geolocation: ['none'],  // Tidak ada akses lokasi
                microphone: ['none'],  // Tidak ada akses mikrofon
            },
        },

        // Pengaturan untuk pembatasan ukuran permintaan
        requestSizeLimiter: {
            maxRequestSizeInBytes: 2000000,  // Batasi ukuran permintaan hingga 2MB
            maxUploadFileRequestInBytes: 8000000,  // Batasi ukuran unggahan file hingga 8MB
            throwError: true,  // Menghasilkan error jika melebihi batas ukuran
        },

        // Pengaturan untuk rate limiter
        rateLimiter: {
            tokensPerInterval: 100,  // Maksimal 100 permintaan per interval
            interval: 60000,  // Interval waktu dalam milidetik (di sini 1 menit)
            headers: false,  // Tidak mengirim header rate-limiting
            driver: {
                name: 'lruCache',  // Penggunaan cache untuk membatasi permintaan
            },
            throwError: true,  // Menghasilkan error jika melebihi batas permintaan
        },

        // Pengaturan untuk validasi XSS
        xssValidator: {
            throwError: true,  // Menghasilkan error jika ditemukan potensi XSS
        },

        // Pengaturan CSRF
        csrf: {
            enabled: false,  // Mengaktifkan perlindungan CSRF
        },

        // Pengaturan untuk menyembunyikan log atau informasi sensitif
        removeLoggers: {
            external: [],
            consoleType: ['log', 'debug'],
            include: [/\.[jt]sx?$/, /\.vue\??/],  // Menyaring log dari file frontend
            exclude: [/node_modules/, /\.git/],  // Mengecualikan log dari folder node_modules dan .git
        },

        // Pengaturan untuk optimasi Static Site Generation (SSG)
        ssg: {
            meta: true,  // Menyertakan meta tag untuk SEO
            hashScripts: true,  // Menambahkan hash ke skrip
            hashStyles: false,  // Tidak menambahkan hash ke file gaya (untuk saat ini)
            nitroHeaders: true,  // Menambahkan header Nitro untuk serverless
            exportToPresets: true,  // Mengekspor untuk preset tertentu
        },
    },
    app: {
        head: {
            title: "Dolan Lur | Wisata Banyumas",
            htmlAttrs: {
                lang: 'id'
            },
            meta: [
                {name: 'description', content: 'Dolan Lur adalah platform informasi wisata Banyumas yang menyediakan panduan lengkap tentang destinasi wisata, kuliner, dan budaya lokal. Temukan tempat-tempat menarik, aktivitas seru, dan tips perjalanan untuk menjelajahi Banyumas secara mudah dan menyenangkan.'}
            ]
        }
    }
})
