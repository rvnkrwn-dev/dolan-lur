import { User } from '~/server/model/User';

export default defineEventHandler(async (event) => {
    try {
        const users = await User.getAllUsers();

        setResponseStatus(event, 200);
        return { code: 200, data: users };
    } catch (error: any) {
        return sendError(
            event,
            createError({ statusCode: 500, statusMessage: error.message || "Internal Server Error" })
        );
    }
});
