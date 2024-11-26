import { prisma } from "../config/db";

interface KategoriType {
    user_id: number;
    nama: string;
}

export class Kategori {
    static createKategori = (data: KategoriType) => {
        return prisma.kategori.create({
            data,
        });
    };

    static updateKategori = (id: number, data: Partial<KategoriType>) => {
        return prisma.kategori.update({
            where: { id },
            data,
        });
    };

    static getKategoriById = (id: number) => {
        return prisma.kategori.findUnique({
            where: { id },
        });
    };

    static getAllKategori = () => {
        return prisma.kategori.findMany();
    };

    static deleteKategori = (id: number) => {
        return prisma.kategori.delete({
            where: { id },
        });
    };

    static countKategori = () => {
        return prisma.kategori.count();
    }
}
