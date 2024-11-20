import { defineEventHandler, sendError, createError } from 'h3';
import { readFileSync, existsSync } from 'fs';
import path from 'path';

export default defineEventHandler(async (event) => {
    try {
        // Mengambil parameter 'nameFile' dari URL path
        const nameFile = event.context.params?.namefile || '';

        // Pastikan parameter 'nameFile' ada
        if (!nameFile) {
            throw new Error('Nama file tidak diberikan');
        }

        // Tentukan folder upload dengan menggunakan path.join
        const uploadDir = path.join(process.cwd(), '/uploads');

        // Tentukan path lengkap file yang akan dibaca
        const filePath = path.join(uploadDir, nameFile);

        // Periksa apakah file ada di direktori
        if (!existsSync(filePath)) {
            throw new Error('File tidak ditemukan');
        }

        // Membaca file dari disk
        const imageBuffer = readFileSync(filePath);

        // Tentukan tipe MIME berdasarkan ekstensi file
        const fileExtension = nameFile.split('.').pop().toLowerCase();
        const mimeTypes = {
            jpg: 'image/jpeg',
            jpeg: 'image/jpeg',
            png: 'image/png',
            gif: 'image/gif',
        };
        const mimeType = mimeTypes[fileExtension] || 'application/octet-stream';

        // Mengirimkan file gambar sebagai respons dengan tipe MIME yang sesuai
        return new Response(imageBuffer, {
            headers: {
                'Content-Type': mimeType,
            },
        });
    } catch (error) {
        // Menangani error dengan mengirimkan respons error yang sesuai
        return sendError(
            event,
            createError({
                statusCode: 500,
                statusMessage: error.message || 'Internal Server Error',
            })
        );
    }
});
