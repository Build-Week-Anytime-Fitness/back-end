const { JWT_SECRET } = require("../auth/secrets.js")
const jwt = require("jsonwebtoken")
const Classes = require("./classes-model");

const restrictAccess = async (req, res, next) => {
    try {
        const token = req.headers.authorization

        //Checks if the token is provided or not
        if (!token) {
            return res.status(401).json({
                message: "token required",
            })
        }

        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    message: "token invalid",
                })
            }

            req.token = decoded //This token will be accessible by middlewares downstream
            console.log(decoded)
            next()
        })

    } catch (err) {
        next(err)
    }
}

const checkClassPayload = (req, res, next) => {
    try {
        if (!req.body.class_name) {
            return res.status(400).json({
                message: "class_name is required",
            })
        } else if (!req.body.class_type) {
            return res.status(400).json({
                message: "class_type is required",
            })
        } else if (!req.body.class_date) {
            return res.status(400).json({
                message: "class_date is required",
            })
        } else if (!req.body.start_time) {
            return res.status(400).json({
                message: "start_time is required",
            })
        } else if (!req.body.duration) {
            return res.status(400).json({
                message: "duration is required",
            })
        } else if (!req.body.intensity) {
            return res.status(400).json({
                message: "intensity is required",
            })
        } else if (!req.body.location) {
            return res.status(400).json({
                message: "location is required",
            })
        } else if (!req.body.max_class_size) {
            return res.status(400).json({
                message: "max_class_size is required",
            })
        } else if (!req.body.instructor_id) {
            return res.status(400).json({
                message: "instructor_id is required",
            })
        } else {
            next()
        }
    } catch (err) {
        next(err)
    }
}

const checkClassID = async (req, res, next) => {
    try {
        const classInstance = await Classes.findByClassId(req.params.id).first()
        console.log(classInstance)
        if (classInstance) {
            req.classInstance = classInstance;
            next()
        } else {
            return res.status(404).json({
                message: "This fitness class does not exist!!!",
            })
        }

    } catch (err) {
        next(err)
    }
}


module.exports = {
    restrictAccess,
    checkClassPayload,
    checkClassID,
}