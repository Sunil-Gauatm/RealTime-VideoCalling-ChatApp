
export const AuthRegisterValidation = (req, res, next) => {
    const { fullname, email, password } = req.body
    if (!fullname) {
        return res.status(400).json({ message: 'must enter fullname', success: false })
    }
    if (!email) {
        return res.status(400).json({ message: 'must enter email', success: false })
    }
    if (!password) {
        return res.status(400).json({ message: "must enter password ", success: false })
    }
    if (fullname.length < 3) {
        return res.status(400).json({ message: "must be greater than 3 ", success: false })
    }
    if (password.length < 6) {
        return res.status(400).json({ message: "must be greater than 6 ", success: false })
    }
    next()
}

export const AuthLoginValidation = (req, res, next) => {
    const { email, password } = req.body
    if (!email) {
        return res.status(400).json({ message: 'must enter email', success: false })
    }
    if (!password) {
        return res.status(400).json({ message: "must enter password ", success: false })
    }
    next()
}