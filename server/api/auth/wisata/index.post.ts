import fs from 'fs';
import path from 'path';
import { Wisata } from '~/server/model/Wisata';
import { Gambar } from '~/server/model/Gambar';

export default defineEventHandler(async (event) => {
    try {
        // Memeriksa apakah pengguna sudah terautentikasi
        const userId = event.context.auth?.user?.id;
        if (!userId) {
            setResponseStatus(event, 401);
            return { code: 401, message: 'User not authenticated.' };
        }

        // Membaca form data multipart
        const formData = await readMultipartFormData(event);
        const fields: { [key: string]: string } = {};
        const files: { name: string; type: string; data: Buffer }[] = [];

        // Memisahkan fields dan files dari formData
        for (const field of formData) {
            const { name, data, filename, type } = field;

            if (filename) {
                files.push({ name: filename, type, data });
            } else {
                fields[name] = data.toString();
            }
        }

        // Mendapatkan field yang diperlukan
        const { kategori_id, nama, deskripsi, lokasi, jam, harga } = fields;

        // Validasi data
        if (!kategori_id || !nama || !deskripsi || !lokasi || !jam) {
            setResponseStatus(event, 400);
            return { code: 400, message: 'Please provide all required fields.' };
        }

        // Simpan data Wisata ke database
        const wisataData = {
            kategori_id: parseInt(kategori_id),
            nama,
            deskripsi,
            lokasi,
            jam,
            harga: parseInt(harga),
            user_id: userId // Menggunakan user_id dari autentikasi
        };
        const wisata = await Wisata.createWisata(wisataData);

        // Direktori upload gambar
        const uploadsDir = path.join(process.cwd(), 'uploads');
        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir, { recursive: true });
        }

        const gambarResults = [];

        // Menangani pengunggahan gambar
        const gambarFiles = Array.isArray(files) ? files : [files]; // Memastikan files adalah array

        for (const file of gambarFiles) {
            const { name, type, data } = file;

            if (!type.startsWith('image/')) {
                continue; // Abaikan file yang bukan gambar
            }

            const filename = `${Date.now()}-${path.basename(name)}`;
            const filePath = path.join(uploadsDir, filename);

            // Menyimpan file gambar ke server
            await fs.promises.writeFile(filePath, data);

            // Simpan data gambar ke database
            const gambarData = { wisata_id: wisata.id, filename };
            const gambar = await Gambar.createGambar(gambarData);
            gambarResults.push(gambar);
        }

        setResponseStatus(event, 201);
        return {
            code: 201,
            message: 'Wisata berhasil ditambahkan!',
            data: { wisata, gambar: gambarResults },
        };
    } catch (error) {
        console.error('Error:', error);
        return sendError(
            event,
            createError({ statusCode: 500, statusMessage: error.message || 'Internal Server Error' })
        );
    }
});
