import { uploadFile } from '~/server/utils/uploadFile';
import { CreateWisataInput, Wisata } from '~/server/model/Wisata';

function generateUniqueSlug(nama: string) {
    // Membuat slug dari nama wisata dan menambahkan timestamp untuk menjadikannya unik
    const slug = nama.split(' ').join('-').toLowerCase();
    return `${slug}-${Date.now()}`;  // Menambahkan timestamp pada slug
}

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

        // Pastikan formData ada
        if (!formData) {
            setResponseStatus(event, 400);
            return { code: 400, message: 'No form data provided.' };
        }

        const payload: CreateWisataInput = {
            kategori_id: 0, // Default value, akan diisi dengan form data
            nama: '',
            slug: '',
            deskripsi: '',
            harga: 0,
            lokasi: '',
            jam: '',
            user_id: userId,  // ID pengguna yang menambah data
            gambar: []
        };

        let uploadResult;

        // Iterasi untuk mengambil data dari formData dan memasukkannya ke dalam objek payload
        for (const field of formData) {
            const { name, data, filename, type } = field;

            if (typeof name !== 'string') return;

            if (filename) {
                // Jika field adalah file (misalnya gambar), kita bisa memasukkan nama file dan tipe MIME-nya
                const fileBuffer = data as Buffer;  // Convert form data buffer
                const fileName = generateUniqueSlug(filename);  // Generate a unique filename

                // Call the uploadFile function with the correct parameters
                uploadResult = await uploadFile(<any>{
                    fileBuffer,
                    filename: fileName,
                    mimeType: type,
                });

                // Menambahkan informasi gambar ke dalam array gambar
                payload.gambar.push({
                    url: uploadResult.url,  // URL gambar
                    secure_url: uploadResult.secure_url,  // URL aman gambar
                    public_id: uploadResult.public_id  // ID gambar yang digunakan di penyimpanan cloud
                });
            } else if (data) {
                // Handle non-file data (e.g., text fields)
                switch (name) {
                    case 'kategori_id':
                        payload.kategori_id = parseInt(data.toString('utf-8'));  // Konversi kategori_id ke angka
                        break;
                    case 'nama':
                        payload.nama = data.toString('utf-8');
                        payload.slug = generateUniqueSlug(payload.nama);  // Menambahkan slug unik berdasarkan nama
                        break;
                    case 'deskripsi':
                        payload.deskripsi = data.toString('utf-8');
                        break;
                    case 'harga':
                        payload.harga = parseInt(data.toString('utf-8'), 10);
                        break;
                    case 'lokasi':
                        payload.lokasi = data.toString('utf-8');
                        break;
                    case 'jam':
                        payload.jam = data.toString('utf-8');
                        break;
                }
            }
        }

        // Setelah payload lengkap, panggil fungsi createWisata untuk memasukkan data ke dalam database
        const wisata = await Wisata.createWisata(payload);

        // Return response dengan status sukses
        return { code: 201, message: 'Wisata created successfully', data: wisata };

    } catch (error: any) {
        return sendError(
            event,
            createError({
                statusCode: 500,
                statusMessage: error?.message || 'Internal Server Error',
            })
        );
    }
});
