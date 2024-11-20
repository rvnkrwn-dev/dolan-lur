import { Kategori } from '~/server/model/Kategori';

export default defineEventHandler(async (event) => {
    try {
        const id = parseInt(event.context.params?.id || "0");
        const { nama } = await readBody(event);

        if (!id || !nama) {
            setResponseStatus(event, 400);
            return { code: 400, message: "Invalid request data." };
        }

        const updatedKategori = await Kategori.updateKategori(id, { nama });

        setResponseStatus(event, 200);
        return { code: 200, message: "Kategori successfully updated!", data: updatedKategori };
    } catch (error: any) {
        return sendError(
            event,
            createError({ statusCode: 500, statusMessage: error.message || "Internal Server Error" })
        );
    }
});
