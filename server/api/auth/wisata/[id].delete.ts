import { Wisata } from '~/server/model/Wisata';
import { Gambar } from "~/server/model/Gambar";
import { unlink } from 'fs/promises'; // Menggunakan unlink untuk menghapus file
import path from 'path';

export default defineEventHandler(async (event) => {
    try {
        const id = parseInt(event.context.params?.id || "0");
        if (!id) {
            setResponseStatus(event, 400);
            return { code: 400, message: "Invalid Wisata ID." };
        }

        // Ambil semua gambar yang terkait dengan Wisata berdasarkan ID
        const gambarList = await Gambar.getAllGambarById(id); // Pastikan fungsi ini mengambil gambar berdasarkan ID Wisata

        // Cek apakah ada gambar terkait
        if (gambarList && gambarList.length > 0) {
            // Menghapus gambar dari server
            const deletePromises = gambarList.map(async (gambar) => {
                const { filename } = gambar;
                const filePath = path.join(process.cwd(), 'uploads', filename);

                try {
                    // Hapus file gambar
                    await unlink(filePath);
                    console.log(`Gambar ${filename} berhasil dihapus.`);
                } catch (err) {
                    console.error(`Gagal menghapus gambar ${filename}: ${err.message}`);
                    // Anda bisa memilih untuk melanjutkan meskipun ada gambar yang gagal dihapus
                }
            });

            // Tunggu hingga semua gambar dihapus
            await Promise.all(deletePromises);
        }

        // Hapus data wisata dari database
        await Wisata.deleteWisata(id);

        setResponseStatus(event, 200);
        return { code: 200, message: "Wisata and associated images successfully deleted!" };
    } catch (error: any) {
        return sendError(
            event,
            createError({
                statusCode: 500,
                statusMessage: error.message || "Internal Server Error",
            })
        );
    }
});
