import userModel from "../Models/user.model.js"
import { TokenGenerator } from "../lib/jwtTokenGenerate.js"
import { upsertUser } from "../lib/Stream.js"

export const authContoller = {
    register: async (req, res) => {
        try {
            const { fullname, email, password } = req.body

            const existingUser = await userModel.findOne({ email })

            if (existingUser) {
                return res.status(400).json({ message: "User Already Existed Please Login", success: false })
            }
            const idx = Math.floor(Math.random() * 100) + 1
            const randomavatar = `https://avatar.iran.liara.run/public/${idx}.png`

            const user = await userModel.create({
                fullname,
                email,
                password,
                profile: randomavatar
            })

            // Creating the user in the stream
            try {
                await upsertUser({
                    id: user._id.toString(),
                    name: user.fullname,
                    email: user.email,
                    profile: user.randomavatar || ""
                })
                console.log(`user Created for ${user.fullname}`)
            } catch (error) {
                console.log("error while creating the stream user")

            }

            const { password: _, ...userdata } = user._doc

            const token = TokenGenerator(user)

            res.cookie("jwt", token, {
                maxAge: 24 * 60 * 60 * 1000,
                httpOnly: true,
                sameSite: "Strict",
                secure: process.env.NODE_ENV === "production"
            });


            return res.status(200).json({ message: "User Register sucessfully", success: true, User: userdata, Token: token })


        } catch (error) {
            return res.status(500).json({ message: "Internal Server Error", error: error.message })

        }

    },
    login: async (req, res) => {
        const { email, password } = req.body

        const loginUser = await userModel.findOne({ email })
        //check if user existed or not
        if (!loginUser) {
            return res.status(400).json({ message: 'invalid email and password' })
        }
        /// Check the password 
        const ismatched = await loginUser.MatchPassword(password)
        if (!ismatched) {
            return res.status(400).json({ message: "invalid email and password" })
        }
        // remove password from the json
        const { password: _, ...userData } = loginUser._doc
        // generate jwtToken
        const token = TokenGenerator(userData)
        //JWT Token saving on the cookies
        res.cookie("jwt", token, {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "Strict",
            secure: process.env.NODE_ENV === "production"
        });
        /// return sucessfull message
        return res.status(200).json({ message: "Login Sucessfully", success: true, data: userData, Token: token })
    },
    logout: async (req, res) => {
        res.clearCookie("jwt")
        res.status(200).json({ message: "Logout Suceesfully!!!", success: true })
    },
    // Complete Profile page || onbroading 
    onbroad: async (req, res) => {
        try {
            const userid = req.user._id
            const { fullname, bio, nativeLangauge, learningLangauge, location } = req.body

            const updateUser = await userModel.findByIdAndUpdate(userid, {
                fullname,
                bio,
                nativeLangauge,
                learningLangauge,
                location,
                isOnboarded: true
            }, { new: true }).select("-password")

            if (!updateUser) {
                return res.status(400).json({ message: "User Not Found!", success: false })
            }

            try {
                await upsertUser({
                    id: updateUser._id.toString(),
                    name: updateUser.fullname,
                    email: updateUser.email,
                    profile: updateUser.profile || ""
                })
                console.log(`User updated for ${updateUser.fullname}`)
            } catch (error) {
                console.error("Error while updating the stream user:", error)
            }

            return res.status(200).json({ message: "User Onboarded Successfully", success: true, data: updateUser })

        } catch (error) {
            return res.status(500).json({ message: "Internal Server Error", success: false, error: error.message })
        }
    },
    // Check if user is logined or not 
    getLoginUser : async(req, res) => {
        res.status(200).json({message : "Data retrived" , user : req.user , success : true})
    }


}