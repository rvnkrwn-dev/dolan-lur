import bcrypt from 'bcryptjs';
import { User } from '~/server/model/User';

export default defineEventHandler(async (event) => {
    try {
        const id = parseInt(event.context.params?.id || "0");
        const { username, password, role } = await readBody(event);

        if (!id || (!username && !password && !role)) {
            setResponseStatus(event, 400);
            return { code: 400, message: "Invalid request data." };
        }

        const payload: any = {};
        if (username) payload.username = username;
        if (password) payload.password = bcrypt.hashSync(password, 10);
        if (role) payload.role = role;

        const updatedUser = await User.updateUser(id, payload);

        setResponseStatus(event, 200);
        return { code: 200, message: "User successfully updated!", data: updatedUser };
    } catch (error: any) {
        return sendError(
            event,
            createError({ statusCode: 500, statusMessage: error.message || "Internal Server Error" })
        );
    }
});
