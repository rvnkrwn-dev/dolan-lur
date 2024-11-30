import {prisma} from "../config/db";

interface WisataType {
    kategori_id: number;
    nama: string;
    slug: string;
    deskripsi: string;
    lokasi: string;
    jam: string;
    user_id: number; // Menambahkan user_id untuk relasi dengan User
}

export class Wisata {
    static createWisata = (data: WisataType) => {
        return prisma.wisata.create({
            data,
        });
    };

    static updateWisata = (id: number, data: Partial<WisataType>) => {
        return prisma.wisata.update({
            where: {id},
            data,
        });
    };

    static getWisataById = (id: number) => {
        return prisma.wisata.findUnique({
            where: {id},
            include: {
                gambar: true,      // Mengambil gambar terkait dengan wisata
                rating: true,      // Mengambil rating terkait dengan wisata
            },
        });
    };

    static getAllWisata = () => {
        return prisma.wisata.findMany({
            include: {
                gambar: true,      // Mengambil gambar terkait dengan wisata
                rating: true,      // Mengambil rating terkait dengan wisata
            },
        });
    };

    static deleteWisata = (id: number) => {
        return prisma.wisata.delete({
            where: {id},
        });
    };

    static countWisata = () => {
        return prisma.wisata.count()
    }
}
