import { User } from '~/server/model/User';

export default defineEventHandler(async (event) => {
    try {

    } catch (error: any) {
        return sendError(
            event,
            createError({ statusCode: 500, statusMessage: error.message || "Internal Server Error" })
        );
    }
});
