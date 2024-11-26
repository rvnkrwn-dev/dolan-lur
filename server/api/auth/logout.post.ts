import {deleteRefreshToken} from "~/server/utils/jwt";

export default defineEventHandler(async (event) => {
    try {
        await deleteRefreshToken(event)
        return { message: "Logout Successfully" }
    } catch (error: any) {
        return sendError(
            event,
            createError({ statusCode: 500, statusMessage: error.message || "Internal Server Error" })
        );
    }
});
