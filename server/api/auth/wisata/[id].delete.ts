import {Wisata} from '~/server/model/Wisata';
import {Gambar} from "~/server/model/Gambar";
import cloudinary from '~/server/utils/cloud';

export default defineEventHandler(async (event) => {
    try {
        const id = parseInt(event.context.params?.id || "0");
        if (!id) {
            setResponseStatus(event, 400);
            return {code: 400, message: "Invalid Wisata ID."};
        }

        // Ambil semua gambar yang terkait dengan Wisata berdasarkan ID
        const gambarList = await Gambar.getAllGambarById(id); // Pastikan fungsi ini mengambil gambar berdasarkan ID Wisata

        // list yang akan dihapus
        const gambar = gambarList.map((g) => g.public_id)

        // Cek apakah ada gambar terkait
        await cloudinary.api.delete_resources(gambar, {type: 'upload', resource_type: 'image'})

        // Hapus data wisata dari database
        await Wisata.deleteWisata(id);

        setResponseStatus(event, 200);
        return {code: 200, message: "Wisata and associated images successfully deleted!"};
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
