import { Wisata } from '~/server/model/Wisata';

export default defineEventHandler(async (event) => {
    try {
        const slug = event.context.params?.slug

        if (!slug) {
            setResponseStatus(event, 400);
            return { code: 400, message: "Invalid request data." };
        }

        const data = await Wisata.getWisataBySlug(slug);
        setResponseStatus(event, 200);
        return { code: 200, data: data };
    } catch (error: any) {
        return sendError(
            event,
            createError({ statusCode: 500, statusMessage: error.message || "Internal Server Error" })
        );
    }
});
