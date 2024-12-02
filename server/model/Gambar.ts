import {prisma} from "../config/db";

interface GambarType {
    wisata_id: number;
    tautan: string;
}

export class Gambar {
    static updateGambar = (id: number, data: Partial<GambarType>) => {
        return prisma.gambar.update({
            where: {id},
            data,
        });
    };

    static getGambarById = (id: number) => {
        return prisma.gambar.findUnique({
            where: {id},
        });
    };

    static getAllGambarById = (id: number) => {
        return prisma.gambar.findMany({
            where: {id},
        });
    };

    static getAllGambarByCarousel = () => {
        return prisma.gambar.findMany({
            where: {
                carousel: true,
            },
        });
    };

    static getAllGambar = () => {
        return prisma.gambar.findMany({
            include: {
                wisata: true
            }
        });
    };

    static deleteGambar = (id: number) => {
        return prisma.gambar.delete({
            where: {id},
        });
    };
}
