import { Kategori } from '~/server/model/Kategori';

export default defineEventHandler(async (event) => {
    try {
        const kategori = await Kategori.getAllKategori();

        setResponseStatus(event, 200);
        return { code: 200, data: kategori };
    } catch (error: any) {
        return sendError(
            event,
            createError({ statusCode: 500, statusMessage: error.message || "Internal Server Error" })
        );
    }
});
