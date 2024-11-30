import {Wisata} from '~/server/model/Wisata';
import {Gambar} from '~/server/model/Gambar';
import cloudinary from '~/server/utils/cloud';

export default defineEventHandler(async (event) => {
    try {
        // Memeriksa apakah pengguna sudah terautentikasi
        const userId = event.context.auth?.user?.id;
        if (!userId) {
            setResponseStatus(event, 401);
            return {code: 401, message: 'User not authenticated.'};
        }

        // Membaca form data multipart
        const formData = await readMultipartFormData(event);
        const fields: Record<string, string> = {};
        const files: Array<{ name: string; type: string; data: Buffer }> = [];

        if (!formData || !Array.isArray(formData)) {
            setResponseStatus(event, 400);
            return {code: 400, message: 'Invalid or empty form data.'};
        }

        // Menangani data form
        for (const field of formData) {
            const {name, data, filename, type} = field;

            if (filename && type) {
                // Assume filename is provided and push to files array
                files.push({name: filename, type, data});
            } else {
                // Validate name is a string before using it as a key
                if (name) {
                    fields[name] = data.toString();
                } else {
                    console.error('Field name is undefined or not a string');
                }
            }
        }

        // Mendapatkan field yang diperlukan
        const {kategori_id, nama, deskripsi, lokasi, jam, harga} = fields as {
            kategori_id: string;
            nama: string;
            deskripsi: string;
            lokasi: string;
            jam: string;
            harga: string;
        };

        // Validasi data
        if (!kategori_id || !nama || !deskripsi || !lokasi || !jam) {
            setResponseStatus(event, 400);
            return {code: 400, message: 'Please provide all required fields.'};
        }

        // Simpan data Wisata ke database
        const wisataData = {
            kategori_id: parseInt(kategori_id, 10),
            nama,
            deskripsi,
            lokasi,
            jam,
            harga: harga ? parseInt(harga, 10) : 0,
            user_id: userId,
        };
        const wisata = await Wisata.createWisata(wisataData);

        const gambarResults = [];

        // Menangani pengunggahan gambar ke Cloudinary
        for (const file of files) {
            const {name, type, data} = file;

            if (!type.startsWith('image/')) {
                console.warn(`File ${name} is not an image. Skipping.`);
                continue; // Abaikan file yang bukan gambar
            }

            // Unggah gambar ke Cloudinary
            const cloudinaryResponse = await cloudinary.uploader
                .upload(data.toString(), {
                    public_id: name,
                    resource_type: 'image',
                })
                .catch((error) => {
                    console.error('Cloudinary upload error:', error);
                    return null; // Log the error and return null for failure
                });

            if (cloudinaryResponse) {
                // Simpan data gambar ke database
                const gambarData = {
                    wisata_id: wisata.id,
                    url: cloudinaryResponse.secure_url,
                };
                const gambar = await Gambar.createGambar(gambarData);
                gambarResults.push(gambar);
            } else {
                console.error('Failed to upload image to Cloudinary.');
            }
        }

        setResponseStatus(event, 201);
        return {
            code: 201,
            message: 'Wisata berhasil ditambahkan!',
            data: {wisata, gambar: gambarResults},
        };
    } catch (error: any) {
        console.error('Error occurred during the request:', error);
        return sendError(
            event,
            createError({
                statusCode: 500,
                statusMessage: error?.message || 'Internal Server Error',
            })
        );
    }
});
