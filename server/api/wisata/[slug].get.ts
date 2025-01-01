import { Wisata } from '~/server/model/Wisata';

export default defineEventHandler(async (event) => {
    try {
        const slug = event.context.params?.slug;

        if (!slug) {
            setResponseStatus(event, 400);
            return { code: 400, message: "Invalid request data." };
        }

        const data: any = await Wisata.getWisataBySlug(slug);

        if (!data) {
            setResponseStatus(event, 404);
            return { code: 404, message: "Wisata not found." };
        }

        // Hitung rata-rata rating jika ada data rating
        if (data.rating && data.rating.length > 0) {
            const totalBintang = data.rating.reduce((sum: number, review: any) => sum + review.bintang, 0);
            const avgRating = totalBintang / data.rating.length;
            data.avgRating = avgRating.toFixed(2); // Tambahkan rata-rata rating ke data
        } else {
            data.avgRating = null;
        }

        setResponseStatus(event, 200);
        return { code: 200, data };
    } catch (error: any) {
        return sendError(
            event,
            createError({ statusCode: 500, statusMessage: error.message || "Internal Server Error" })
        );
    }
});
