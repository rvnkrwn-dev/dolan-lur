import {prisma} from "../config/db";

interface GambarInput {
    url: string;
    secure_url: string;
    public_id: string
}

export interface CreateWisataInput {
    kategori_id: number;
    nama: string;
    slug: string;
    deskripsi: string;
    harga: number;
    carousel?: boolean;
    lokasi: string;
    jam: string;
    user_id: number;
    gambar: GambarInput[];
}

export class Wisata {
    static createWisata = (data: CreateWisataInput) => {
        return prisma.wisata.create({
            data: {
                kategori_id: data.kategori_id,
                nama: data.nama,
                slug: data.slug,
                deskripsi: data.deskripsi,
                harga: data.harga,
                carousel: data?.carousel,
                lokasi: data.lokasi,
                jam: data.jam,
                user_id: data.user_id,
                gambar: {
                    create: data.gambar.map((gambar) => ({
                        url: gambar.url,  // tautan gambar
                        secure_url: gambar.secure_url,  // secure tautan gambar
                        public_id: gambar.public_id
                    })),
                },
            },
            include: {
                gambar: true,
                rating: true,
                user: true
            }
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
                rating: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                username: true,
                                role: true,
                            }
                        }
                    }
                },      // Mengambil rating terkait dengan wisata
                user: {
                    select: {
                        id: true,
                        username: true,
                        role: true,
                        created_at: true,
                    }
                },      // Mengambil user terkait dengan wisata
                kategori: true
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
