import { Rating, RatingType } from "~/server/model/Rating";
import { z } from "zod";

export default defineEventHandler(async (event) => {
    try {
        // Autentikasi pengguna
        const userId = event.context.auth?.user?.id;
        if (!userId) {
            setResponseStatus(event, 401);
            return { code: 401, message: 'User not authenticated.' };
        }

        // Validasi data input
        const bodySchema = z.object({
            wisata_id: z.number().min(1, "Wisata ID is required and must be valid."),
            komentar: z.string().min(10, "Komentar must be at least 10 characters."),
            bintang: z.number().min(1).max(5, "Bintang must be between 1 and 5."),
        });

        const data = await readBody(event);
        const parsedData = bodySchema.parse(data);

        // Payload untuk Prisma
        const payload: RatingType = {
            user_id: userId,
            wisata_id: parsedData.wisata_id,
            komentar: parsedData.komentar,
            bintang: parsedData.bintang,
        };

        // Buat rating di database
        const response = await Rating.createRating(payload);

        setResponseStatus(event, 201);
        return { code: 201, message: "Rating successfully created!", data: response };
    } catch (error: any) {
        if (error.name === "ZodError") {
            return sendError(
                event,
                createError({
                    statusCode: 400,
                    statusMessage: "Invalid data.",
                    data: error.errors, // Mengembalikan kesalahan validasi secara detail
                })
            );
        }

        return sendError(
            event,
            createError({
                statusCode: 500,
                statusMessage: error.message || "Internal Server Error",
            })
        );
    }
});
