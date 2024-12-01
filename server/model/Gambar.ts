import { prisma } from "../config/db";

interface GambarType {
    wisata_id: number;
    tautan: string;
}

export class Gambar {
    static createGambar = (data: { wisata_id: any; tautan: string }) => {
        return prisma.gambar.create({
            data,
        });
    };

    static createManyGambar = (data: GambarType[]) => {
        return prisma.gambar.createMany({
            data,
        });
    };

    static updateGambar = (id: number, data: Partial<GambarType>) => {
        return prisma.gambar.update({
            where: { id },
            data,
        });
    };

    static getGambarById = (id: number) => {
        return prisma.gambar.findUnique({
            where: { id },
        });
    };

    static getAllGambarById = (id: number) => {
        return prisma.gambar.findMany({
            where: { id },
        });
    };

    static getAllGambar = () => {
        return prisma.gambar.findMany();
    };

    static deleteGambar = (id: number) => {
        return prisma.gambar.delete({
            where: { id },
        });
    };
}
