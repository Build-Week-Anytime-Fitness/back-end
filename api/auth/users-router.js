const router = require('express').Router();
const { checkEmailExists, checkLoginPayload, checkRegisterPayload, checkIfUnique } = require('./auth-middlewares.js');

const Users = require("./users-model.js")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require("./secrets.js")


router.post('/register', checkRegisterPayload, checkIfUnique, async (req, res, next) => {
    try {
        const name = req.body.name
        const password = req.body.password
        const email = req.body.email
        const isAdult = req.body.isAdult
        const isInstructor = req.body.isInstructor

        const newUser = await Users.add({
            name,
            email,
            isAdult,
            isInstructor,
            password: await bcrypt.hash(password, 14) // 2 ^ 24 rounds of hashing
        })

        res.status(201).json(newUser)

    } catch (err) {
        next(err)
    }
})

router.post('/login', checkLoginPayload, checkEmailExists, async (req, res, next) => {
    try {
        const options = {
            expiresIn: '1d',
        }

        const payload = {
            subject: req.user.id,
            email: req.user.email,
        }

        const token = jwt.sign(payload, JWT_SECRET, options)

        res.status(200).json({
            message: `welcome, ${req.user.name}`,
            token: token,
        })

    } catch (err) {
        next(err)
    }
});

module.exports = router;
