import bcrypt from 'bcryptjs';
import { User } from '~/server/model/User';

export default defineEventHandler(async (event) => {
    try {
        const { username, password, role } = await readBody(event);

        if (!username || !password) {
            setResponseStatus(event, 400);
            return { code: 400, message: "Please provide all required fields." };
        }

        const hashedPassword = bcrypt.hashSync(password, 10);

        const user = await User.createUser({ username, password: hashedPassword, role });

        setResponseStatus(event, 201);

        return {
            code: 201,
            message: "User registered successfully!",
            user: {
                id: user.id,
                username: user.username,
                role: user.role,
            },
        };
    } catch (error: any) {
        return sendError(
            event,
            createError({ statusCode: 500, statusMessage: error.message || "Internal Server Error" })
        );
    }
});
