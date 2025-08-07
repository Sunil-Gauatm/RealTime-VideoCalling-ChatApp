import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const MONGOURI = process.env.MONGOURI


export const Connection = async () => {
    try {
        const con = await mongoose.connect(MONGOURI)
        console.log(`MongoDb Connected in ${con.connection.host}`)

    } catch (error) {
        console.log("Error Connecting to database", error)

    }

}