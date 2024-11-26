import { prisma } from "../config/db";

interface UserType {
    username: string;
    password: string;
    role: Role;
}

enum Role {
    admin = "Admin",
    user = "User",
}

export class User {
    static createUser = (data: UserType) => {
        return prisma.user.create({
            data: {
                username: data.username,
                password: data.password,
                role: data?.role,
            },
        });
    };

    static updateUser = (id: number, data: Partial<UserType>) => {
        return prisma.user.update({
            where: { id },
            data,
        });
    };

    static getUserByUsername = (username: string) => {
        return prisma.user.findUnique({
            where: { username },
        });
    };

    static getUserById = (id: number) => {
        return prisma.user.findUnique({
            where: { id },
        });
    };

    static getAllUsers = () => {
        return prisma.user.findMany();
    };

    static deleteUser = (id: number) => {
        return prisma.user.delete({
            where: { id },
        });
    };

    static countUsers = () => {
        return prisma.user.count()
    }
}
