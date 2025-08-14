export const onBroadValidation = async (req, res, next) => {
    const { fullname, bio, nativeLangauge, learningLangauge, location } = req.body

    if (!fullname || !bio || !nativeLangauge || !learningLangauge || !location) {
        return res.status(400).json({
            message: "All the Feild are Required",
            missingFeild: [
                !fullname && "fullname",
                !bio && "bio",
                !nativeLangauge && "nativeLangauge",
                !learningLangauge && "learningLanguage",
                !location && "location"
            ].filter(Boolean)
        })
    }
    next()

}