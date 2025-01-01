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

    static getWisataBySlug = (slug: string) => {
        return prisma.wisata.findUnique({
            where: {slug},
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
                kategori: true,
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

    static getNewWisata = () => {
        return prisma.wisata.findMany({
            orderBy: {
                created_at: 'desc',  // Urutkan berdasarkan 'created_at' terbaru
            },
            take: 8,  // Batasi hasil menjadi 6
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
                    }   // Mengambil rating terkait dengan wisata
                },
                user: {
                    select: {
                        id: true,
                        username: true,
                        role: true,
                        created_at: true,
                    }
                },  // Mengambil user terkait dengan wisata
                kategori: true
            },
        });
    };

    static deleteWisata = (id: number) => {
        return prisma.wisata.delete({
            where: {id},
        });
    };

    static updateWisata = (id: number, data: any) => {
        return prisma.wisata.update({
            where: {id},
            data: data
        });
    };

    static countWisata = () => {
        return prisma.wisata.count()
    }
}
