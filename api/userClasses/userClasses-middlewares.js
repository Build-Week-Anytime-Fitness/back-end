const ClientClasses = require("./userClasses-model.js");
const Classes = require("../classes/classes-model.js")

const checkSignupPayload = (req, res, next) => {
    console.log(req.body.class_id)
    try {
        if (!req.body.class_id) {
            return res.status(400).json({
                message: 'class_id needs to be provided!!!'
            })
        } else {
            next()
        }
    } catch (err) {
        next(err)
    }
}

const checkClassID_bod = async (req, res, next) => {
    try {
        const classInstance = await Classes.findByClassId(req.body.class_id)
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

const checkAlreadySignup = async (req, res, next) => {
    try {
        const allClientClasses = await ClientClasses.findByClientID(req.token.subject)
        const foundClass = allClientClasses.find(element => element.class_id === req.body.class_id)
        if (foundClass) {
            return res.status(400).json({
                message: `You are already signed up for ${foundClass.class_name}`,
            })
        } else {
            next()
        }

    } catch (err) {
        next(err)
    }
}

const checkEnrollment = async (req, res, next) => {
    try {
        const allClientClasses = await ClientClasses.findByClientID(req.token.subject)
        const foundClass = allClientClasses.find(element => element.class_id === parseInt(req.params.id))
        console.log(foundClass)

        if (!foundClass) {
            return res.status(400).json({
                message: `You never signed up for this class!!!`,
            })

        } else {
            next()
        }

    } catch (err) {
        next(err)
    }
}


module.exports = {
    checkSignupPayload,
    checkAlreadySignup,
    checkClassID_bod,
    checkEnrollment
}