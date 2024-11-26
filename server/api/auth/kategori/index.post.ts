import { Kategori } from '~/server/model/Kategori';

export default defineEventHandler(async (event) => {
    try {
        const { user_id, nama } = await readBody(event);
        if (!user_id || !nama) {
            setResponseStatus(event, 400);
            return { code: 400, message: "Please provide all required fields." };
        }

        const payload = { user_id, nama };
        const data = await Kategori.createKategori(payload);

        setResponseStatus(event, 201);
        return { code: 201, message: "Kategori successfully created!", data };
    } catch (error: any) {
        return sendError(
            event,
            createError({ statusCode: 500, statusMessage: error.message || "Internal Server Error" })
        );
    }
});
