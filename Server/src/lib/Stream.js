import { StreamChat } from 'stream-chat'
import dotenv from 'dotenv'

dotenv.config()
const apiKey = process.env.STEAM_API_KEY
const apiSecret = process.env.STEAM_API_SECRET

if (!apiKey && !apiSecret) {
    console.log('Apikey and apikey secret isnt provided!!!')
}
const cilent = new StreamChat(apiKey, apiSecret)

export const upsertUser = async (userData) => {
    try {
        await cilent.upsertUsers([userData])
        return userData
    } catch (error) {
        console.log("error while upersting the user", error)
    }
}

