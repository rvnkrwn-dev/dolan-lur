import { prisma } from "../config/db";

export interface RatingType {
    user_id: number;
    wisata_id: number;
    komentar: string;
    bintang: number;
}

export class Rating {
    static createRating = (data: RatingType) => {
        return prisma.rating.create({
            data,
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        role: true,
                    }
                }
            }
        });
    };

    static updateRating = (id: number, data: Partial<RatingType>) => {
        return prisma.rating.update({
            where: { id },
            data,
        });
    };

    static getRatingById = (id: number) => {
        return prisma.rating.findUnique({
            where: { id },
        });
    };

    static getAllRating = () => {
        return prisma.rating.findMany();
    };

    static deleteRating = (id: number) => {
        return prisma.rating.delete({
            where: { id },
        });
    };
}
