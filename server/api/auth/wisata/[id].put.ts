import { Wisata } from '~/server/model/Wisata';
import {WisataType} from "~/types/WisataType";

export default defineEventHandler(async (event) => {
    try {
        const id = parseInt(event.context.params?.id || "0");
        const { nama, deskripsi, lokasi, jam } = await readBody(event);

        if (!id || (!nama && !deskripsi && !lokasi && !jam)) {
            setResponseStatus(event, 400);
            return { code: 400, message: "Invalid request data." };
        }

        const payload: any = {};
        if (nama) payload.nama = nama;
        if (deskripsi) payload.deskripsi = deskripsi;
        if (lokasi) payload.lokasi = lokasi;
        if (jam) payload.jam = jam;

        const updatedWisata = await Wisata.updateWisata(id, payload);

        setResponseStatus(event, 200);
        return { code: 200, message: "Wisata successfully updated!", data: updatedWisata };
    } catch (error: any) {
        return sendError(
            event,
            createError({ statusCode: 500, statusMessage: error.message || "Internal Server Error" })
        );
    }
});
