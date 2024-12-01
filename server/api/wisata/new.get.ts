import {Wisata} from '~/server/model/Wisata';

export default defineEventHandler(async (event) => {
    try {
        const wisata = await Wisata.getNewWisata();

        setResponseStatus(event, 200);
        return {code: 200, data: wisata};
    } catch (error: any) {
        return sendError(
            event,
            createError({statusCode: 500, statusMessage: error.message || "Internal Server Error"})
        );
    }
});
