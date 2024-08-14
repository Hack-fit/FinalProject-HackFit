import jwt from 'jsonwebtoken'
import * as jose from 'jose'
const JWT_SECRET = process.env.JWT_SECRET as string

export const signToken = (payload: {_id: string; email: string}) => {
    return jwt.sign(payload, JWT_SECRET)
}

export const jwtVerify = (payload : string) => {
    return jwt.verify(payload, JWT_SECRET)
}

export const verifyJose = async <T>(payload : string) => {
    const secretKey = new TextEncoder().encode(JWT_SECRET)
    const payloadJose = await jose.jwtVerify<T>(payload, secretKey)

    return payloadJose.payload
}