import mongoose from "mongoose";

const friendRequestSchema = mongoose.Schema({
    Sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    Receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    Status: {
        type: String,
        enum: ["pending", "accepted"],
        default: "pending"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
},
    {
        timestamps: true

    }
)

export const friendRequestModel = mongoose.model("friendRequest", friendRequestSchema)