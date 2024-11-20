import { User } from '~/server/model/User';

export default defineEventHandler(async (event) => {
    try {
        const id = parseInt(event.context.params?.id || "0");
        if (!id) {
            setResponseStatus(event, 400);
            return { code: 400, message: "Invalid user ID." };
        }

        const user = await User.getUserById(id);

        if (!user) {
            setResponseStatus(event, 404);
            return { code: 404, message: "User not found." };
        }

        setResponseStatus(event, 200);
        return { code: 200, data: user };
    } catch (error: any) {
        return sendError(
            event,
            createError({ statusCode: 500, statusMessage: error.message || "Internal Server Error" })
        );
    }
});
