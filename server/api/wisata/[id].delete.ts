import { Wisata } from '~/server/model/Wisata';

export default defineEventHandler(async (event) => {
    try {
        const id = parseInt(event.context.params?.id || "0");
        if (!id) {
            setResponseStatus(event, 400);
            return { code: 400, message: "Invalid Wisata ID." };
        }

        await Wisata.deleteWisata(id);

        setResponseStatus(event, 200);
        return { code: 200, message: "Wisata successfully deleted!" };
    } catch (error: any) {
        return sendError(
            event,
            createError({ statusCode: 500, statusMessage: error.message || "Internal Server Error" })
        );
    }
});
