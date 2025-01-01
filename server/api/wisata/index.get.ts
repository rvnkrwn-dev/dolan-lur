import { Wisata } from '~/server/model/Wisata';

export default defineEventHandler(async (event) => {
    try {
        // Ambil semua data wisata
        const wisataList = await Wisata.getAllWisata();

        // Proses untuk menambahkan rata-rata rating
        const wisataWithRatings = wisataList.map((wisata: any) => {
            if (wisata.rating && wisata.rating.length > 0) {
                // Hitung rata-rata rating
                const totalBintang = wisata.rating.reduce((sum: number, review: any) => sum + review.bintang, 0);
                const avgRating = totalBintang / wisata.rating.length;
                return {...wisata, avgRating: avgRating.toFixed(1)}; // Tambahkan rata-rata rating
            }
            return {...wisata, avgRating: null}; // Jika tidak ada rating, set ke null
        });

        setResponseStatus(event, 200);
        return { code: 200, data: wisataWithRatings };
    } catch (error: any) {
        return sendError(
            event,
            createError({ statusCode: 500, statusMessage: error.message || "Internal Server Error" })
        );
    }
});
