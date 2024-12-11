import {uploadFile} from '~/server/utils/uploadFile'; // Pastikan fungsi uploadFile sudah ada
import {Wisata} from '~/server/model/Wisata';

function generateUniqueSlug(nama: string) {
    const slug = nama.split(' ').join('-').toLowerCase();
    return `${slug}-${Date.now()}`;
}

export default defineEventHandler(async (event) => {
    try {
        const id = parseInt(event.context.params?.id || "0");

        if (!id) {
            setResponseStatus(event, 400);
            return {code: 400, message: "Invalid wisata ID."};
        }

        // Membaca form data multipart (termasuk gambar)
        const formData = await readMultipartFormData(event);

        if (!formData) {
            setResponseStatus(event, 400);
            return {code: 400, message: 'No form data provided.'};
        }

        const payload: any = {};

        let uploadResult;

        // Iterasi form data
        for (const field of formData) {
            const {name, data, filename, type} = field;

            if (typeof name !== 'string') continue;

            // Menangani file (gambar)
            if (filename) {
                const fileBuffer = data as Buffer;
                const fileName = generateUniqueSlug(filename);

                // Meng-upload file dan mendapatkan hasil upload
                uploadResult = await uploadFile(<any>{
                    fileBuffer,
                    filename: fileName,
                    mimeType: type,
                });

                if (!payload.gambar) payload.gambar = [];
                payload.gambar.push({
                    url: uploadResult.url,
                    secure_url: uploadResult.secure_url,
                    public_id: uploadResult.public_id,
                });
            } else if (data) {
                // Meaning data non-file (seperti nama, deskripsi, dll)
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

        // Pastikan ada data yang diperbarui
        if (Object.keys(payload).length === 0) {
            setResponseStatus(event, 400);
            return {code: 400, message: "No valid fields to update."};
        }

        // Melakukan update wisata
        const updatedWisata = await Wisata.updateWisata(id, payload);

        // Mengembalikan respon sukses
        setResponseStatus(event, 200);
        return {code: 200, message: "Wisata successfully updated!", data: updatedWisata};

    } catch (error: any) {
        return sendError(
            event,
            createError({statusCode: 500, statusMessage: error.message || "Internal Server Error"})
        );
    }
});
