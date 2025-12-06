import { userCreateSchema } from "../validators/user.validator";
import ErrorHandler from "../utils/ErrorHandler";

import bcrypt from "bcrypt";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";
import { addUser, findUserByEmail, findUserByUsernameOrEmail } from "../repositories/user.repository";

export const registerUserService = async (data: any) => {
    const { error, value } = userCreateSchema.validate(data)
    if (error) {
        throw new ErrorHandler(error.message, 400)
    }

    const userExists = await findUserByUsernameOrEmail(value.username, value.email)

    if (userExists) {
        throw new ErrorHandler("User already exists", 400)
    }

    const hashedPassword = await bcrypt.hash(value.password, 10)

    return await addUser({ ...value, password: hashedPassword })
}

export const loginUserService = async (data: any) => {
    const { email, password } = data

    if (!email || !password) {
        throw new ErrorHandler("Please enter email and password", 400)
    }

    const user = await findUserByEmail(email)

    if (!user) {
        throw new ErrorHandler("Invalid email or password", 401)
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password)

    if (!isPasswordMatched) {
        throw new ErrorHandler("Invalid email or password", 401)
    }

    const access_token = generateAccessToken(user)
    const refresh_token = generateRefreshToken(user)

    return { user, access_token, refresh_token }
}
