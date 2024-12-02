import {Gambar} from "~/server/model/Gambar";

export default defineEventHandler(async (event) => {
    try {
        const gambar = await Gambar.getAllGambar();

        setResponseStatus(event, 200);
        return { code: 200, data: gambar };
    } catch (error: any) {
        return sendError(
            event,
            createError({ statusCode: 500, statusMessage: error.message || "Internal Server Error" })
        );
    }
});
