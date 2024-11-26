import {decodeRefreshToken, deleteRefreshToken, generateToken} from "~/server/utils/jwt.ts"
import {User} from "~/server/model/User";

export default defineEventHandler(async (event) => {
    const refreshToken = getCookie(event, 'refresh_token')

    if (!refreshToken) {
        return sendError(event, createError({
            statusCode: 401,
            statusMessage: 'Refresh token is invalid'
        }))
    }

    const token = decodeRefreshToken(refreshToken)

    try {
        const {password, ...user} = await User.getUserById(token.id)

        const { accessToken } = generateToken(user)

        return { access_token: accessToken }
    } catch (error) {
        deleteRefreshToken(event)
        return sendError(event, createError({
            statusCode: 500,
            statusMessage: 'Something went wrong'
        }))
    }
});