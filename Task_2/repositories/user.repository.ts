import { db } from "../utils/prisma"


export const addUser = async (data: any) => {
    return await db.user.create({ data })
}

export const updateUser = async (id: string, data: any) => {
    return await db.user.update({ where: { user_id: id }, data: data })
}

export const getUserById = async (id: string) => {
    return await db.user.findFirst({ where: { user_id: id } })
}

export const deleteUser = async (id: string) => {
    return await db.user.delete({ where: { user_id: id } })
}
