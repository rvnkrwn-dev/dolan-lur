import {Wisata} from '~/server/model/Wisata';
import {User} from "~/server/model/User";
import {Kategori} from "~/server/model/Kategori";

export default defineEventHandler(async (event) => {
    try {
        const users = await User.countUsers();
        const destination = await Wisata.countWisata();
        const categories = await Kategori.countKategori();

        setResponseStatus(event, 200);
        return {code: 200, data: {
            users, destination, categories
            }};
    } catch (error: any) {
        return sendError(
            event,
            createError({statusCode: 500, statusMessage: error.message || "Internal Server Error"})
        );
    }
});
