import formidable from "formidable";
import fs from "fs/promises";
import path from "path";
import { Wisata } from "~/server/model/Wisata";
import { Gambar } from "~/server/model/Gambar";

export default defineEventHandler(async (event) => {
    const uploadDir = path.join(process.cwd(), "uploads"); // Make sure the 'uploads' directory exists

    try {
        const form = formidable({
            multiples: true,
            uploadDir,  // Use the new directory
            keepExtensions: true,
        });

        const { fields, files }: { fields: WisataFields, files: formidable.Files } = await new Promise((resolve, reject) => {
            form.parse(event.node.req, (err, fields, files) => {
                if (err) reject(err);
                resolve({ fields, files });
            });
        });

        const { kategori_id, nama, deskripsi, lokasi, jam } = fields;

        // Validate that all required fields are provided
        if (!kategori_id || !nama || !deskripsi || !lokasi || !jam) {
            setResponseStatus(event, 400);
            return { code: 400, message: "Please provide all required fields." };
        }

        // Ensure these fields are strings and not arrays
        const payload = {
            kategori_id: Number(kategori_id),  // Convert kategori_id to a number
            nama: Array.isArray(nama) ? nama[0] : nama,  // Ensure it's a string
            deskripsi: Array.isArray(deskripsi) ? deskripsi[0] : deskripsi,  // Ensure it's a string
            lokasi: Array.isArray(lokasi) ? lokasi[0] : lokasi,  // Ensure it's a string
            jam: Array.isArray(jam) ? jam[0] : jam,  // Ensure it's a string
        };

        // Create the Wisata entry in the database
        const wisata = await Wisata.createWisata(payload);

        // Check if there are image files in the request
        if (!files?.gambar || (Array.isArray(files.gambar) && files.gambar.length === 0)) {
            setResponseStatus(event, 400);
            return { code: 400, message: "At least one image is required." };
        }

        // Handle image uploads
        const gambarFiles = Array.isArray(files.gambar) ? files.gambar : [files.gambar];

        for (const file of gambarFiles) {
            const filename = path.basename(file.filepath);
            // Save image data in the Gambar table
            await Gambar.createGambar({
                wisata_id: wisata.id,
                filename,
            });
        }

        // Return a successful response
        setResponseStatus(event, 201);
        return { code: 201, message: "Wisata successfully created!", data: wisata };

    } catch (error: any) {
        return sendError(
            event,
            createError({
                statusCode: 500,
                statusMessage: error.message || "Internal Server Error"
            })
        );
    }
});
