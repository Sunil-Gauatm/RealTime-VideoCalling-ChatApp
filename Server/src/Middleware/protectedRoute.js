import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import userModel from '../Models/user.model.js'
dotenv.config()

const jwtSecretKey = process.env.JWTSECRETKEY

export const ProtectedRoute = async (req, res, next) => {
    try {


        const token = req.cookies.jwt

        const decoded = jwt.verify(token, jwtSecretKey)

        if (!decoded) {
            return res.status(400).json({ message: "unauthorized : invalid Token", success: false })
        }
        // finding by userr
        const user = await userModel.findById(decoded.user_Id).select("-password")

        if (!user) {
            return res.status(400).json({ message: "unauthorizedd!!! User not Found!!!", success: false })
        }
        // sending back from the req 
        req.user = user

        next()

    } catch (error) {
        return res.status(500).json({ message: "Something went wrong!", success: false, error: error.message })
    }
}
