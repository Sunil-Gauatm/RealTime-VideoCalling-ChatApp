import userModel from "../Models/user.model.js"

export const userController = {
    getRecommended: async (req, res) => {
        try {
            const currentUserId = req.user.id
            const currentUser = req.user

            const RecommendedUser = await userModel.find({
                $and: [
                    { _id: { $ne: currentUserId } },
                    { $id: { $nin: currentUser.friends } },
                    { isOnboarded: true }
                ]
            })
            return res.status(200).json(RecommendedUser)


        } catch (error) {
            return res.status(500).json({ message: "Internal Server Error", error: error.message })

        }
    },
    getFriends: async (req, res) => {
        try {
            const user = await userModel.findById(req.user.id)
                .select('friends')
                .populate("friends", "fullName profile nativeLangauge learningLangauge")

            return res.status(200).json(user.friends)
        } catch (error) {
            return res.status(500).json({ message: "Internal Server Error", error: error.message })
        }
    },
    sendFriendRequest : async(req , res) =>{
        const myId = req.user.id
        const { id : receiverId} = req.params

        if(myId === receiverId){
            return res.status(400).json({message : "Cant send Friend Request to Yourself"})
        }
        const receipt = await userModel.findById(receiverId)

        if(!receipt){
            return res.status(400).json({message : "User not found"})
        }
        //check user existed or not
        if(receipt.friends.includes(myId)){
            return res.status(400).json({message : 'You are already friend with this User'})
        }

    }

}