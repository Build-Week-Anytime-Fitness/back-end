const Users = require("./users-model.js")
const bcrypt = require("bcryptjs")

//Checks if the new username is unique or not
const checkIfUnique = async (req, res, next) => {
    try {
        const email = req.body.email
        const user = await Users.findByEmail(email).first()

        if (user) {
            return res.status(400).json({
                message: 'email already taken'
            })
        } else {
            next()
        }

    } catch (err) {
        next(err)
    }
}


//Checks if the email and password are provided while logging in and registering 
const checkLoginPayload = (req, res, next) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({
            message: "email and password are required",
        })
    } else {
        next()
    }
}

//Checks if the certain fields are provided as part of the request body while registering the user
const checkRegisterPayload = async (req, res, next) => {
    if (!req.body.name) {
        return res.status(400).json({
            message: "user's name is missing",
        })
    } else if (!req.body.email || !req.body.password) {
        return res.status(400).json({
            message: "email and password need to be provided",
        })
    } else if (typeof (req.body.is_instructor) !== 'boolean') {
        return res.status(400).json({
            message: "specify a bool value to specify if the user is an instructor",
        })
    } else {
        next()
    }
}

//Checks if the user already exists in the database or not upon login

const checkEmailExists = async (req, res, next) => {
    try {
        const email = req.body.email
        const user = await Users.findByEmail(email).first()

        if (!user) {
            return res.status(401).json({
                message: 'This account does not exist',
            })
        }

        const passwordValid = await bcrypt.compare(req.body.password, user.password)

        if (!passwordValid) {
            return res.status(401).json({
                message: "invalid credentials",
            })
        }

        //Passes the user object to next middleware downstream
        req.user = user
        next()

    } catch (err) {
        next(err)
    }
}

module.exports = {
    checkIfUnique,
    checkLoginPayload,
    checkRegisterPayload,
    checkEmailExists,
}