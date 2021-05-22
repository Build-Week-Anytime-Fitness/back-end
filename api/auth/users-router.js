const router = require('express').Router();
const { checkEmailExists, checkLoginPayload, checkRegisterPayload, checkIfUnique } = require('./auth-middlewares.js');

const Users = require("./users-model.js")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require("./secrets.js")


router.post('/register', checkRegisterPayload, checkIfUnique, async (req, res, next) => {
    try {
        let mutatedUser = {
            name: req.body.name,
            email: req.body.email,
            is_adult: req.body.is_adult || true,
            is_instructor: req.body.is_instructor,
            password: await bcrypt.hash(req.body.password, 14),
        }

        let newUser = await Users.add(mutatedUser);
        console.log(newUser)
        return res.status(201).json({
            message: 'User successfully registered',
        });

    } catch (e) {
        next(e);
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
            is_instructor: req.user.is_instructor,
        }

        const token = jwt.sign(payload, JWT_SECRET, options)

        res.status(200).json({
            message: `welcome, ${req.user.name}`,
            id: req.user.id,
            email: req.user.email,
            token: token,
            is_instructor: req.user.is_instructor,
        })

    } catch (err) {
        next(err)
    }
});

module.exports = router;
