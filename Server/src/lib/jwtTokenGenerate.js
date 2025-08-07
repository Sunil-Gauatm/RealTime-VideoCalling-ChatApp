import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const JWTSECRET = process.env.JWTSECRETKEY

export const TokenGenerator = (user) => {
    return jwt.sign({
        user_Id: user._id,
        fullname: user.fullname,
        email: user.email
    },
        JWTSECRET,
        {
            expiresIn: '1d'
        }
    )
}