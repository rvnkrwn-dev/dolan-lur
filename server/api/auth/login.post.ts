import bcrypt from 'bcryptjs';
import { User } from '~/server/model/User';
import {generateToken, sendRefreshToken} from "~/server/utils/jwt";

export default defineEventHandler(async (event) => {
    try {
        const { username, password } = await readBody(event);

        if (!username || !password) {
            setResponseStatus(event, 400);
            return { code: 400, message: "Please provide both username and password." };
        }

        const user = await User.getUserByUsername(username);
        if (!user || !bcrypt.compareSync(password, user.password)) {
            setResponseStatus(event, 401);
            return { code: 401, message: "Invalid credentials." };
        }

        const {accessToken, refreshToken} = generateToken({ id: user.id, role: user.role })

        setResponseStatus(event, 200);
        sendRefreshToken(event, refreshToken)
        return {
            code: 200,
            message: "Login successful!",
            access_token: accessToken,
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
