import { Kategori } from '~/server/model/Kategori';

export default defineEventHandler(async (event) => {
    try {
        const userId = event.context.auth?.user?.id;
        if (!userId) {
            setResponseStatus(event, 401);
            return { code: 401, message: 'User not authenticated.' };
        }

        const { nama } = await readBody(event);
        if (!nama) {
            setResponseStatus(event, 400);
            return { code: 400, message: "Please provide all required fields." };
        }

        const payload = { user_id: userId, nama };
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
