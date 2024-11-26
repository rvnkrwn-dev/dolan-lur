import bcrypt from 'bcryptjs';
import {User} from "~/server/model/User";

export default defineEventHandler(async (event) => {
    try {
        // Membaca body dari request
        const { username, password, role } = await readBody(event);

        // Validasi input
        if (!username || !password || !role) {
            setResponseStatus(event, 400);
            return {
                code: 400,
                message: "Please provide all required fields: username, password, and role.",
            };
        }

        // Payload untuk membuat user baru
        const payload = {
            username: username,
            password: bcrypt.hashSync(password, 10), // Mengenkripsi password
            role: role,
        };

        // Memanggil fungsi createUser dari model User
        await User.createUser(payload);

        // Response sukses
        setResponseStatus(event, 201);
        return {
            code: 201,
            message: "User successfully created!",
        };
    } catch (error: any) {
        // Handling error
        return sendError(
            event,
            createError({
                statusCode: 500,
                statusMessage: error.message || "Internal Server Error",
            })
        );
    }
});
