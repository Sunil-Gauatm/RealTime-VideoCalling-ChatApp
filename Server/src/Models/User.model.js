import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        default: ""
    },
    profile: {
        type: String,
        default: ""
    },
    nativeLangauge: {
        type: String,
        default: ""
    },
    learningLangauge: {
        type: String,
        default: ""
    },
    location: {
        type: String,
        default: ""
    },
    isOnboarded: {
        type: Boolean,
        default: false
    },
    friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]
},
    { timestamps: true })


// pre hook ( this is to hash the password )

userSchema.pre("save", async function (next) {
    try {
        if (!this.isModified('password')) return next()
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
        next()
    } catch (error) {
        next(error)
    }
})

userSchema.methods.MatchPassword = async function (EnteredPassword) {
    const ispasswordMatch = await bcrypt.compare(EnteredPassword , this.password)
    return ispasswordMatch
    
}
const userModel = mongoose.model('User', userSchema)

export default userModel