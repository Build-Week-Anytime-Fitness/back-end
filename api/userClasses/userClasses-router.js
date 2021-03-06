const router = require('express').Router();
const ClientClasses = require("./userClasses-model.js");
const Classes = require("../classes/classes-model.js");
const { restrictAccess, checkClassID_params } = require('../classes/classes-middlewares.js')
const { checkSignupPayload, checkAlreadySignup, checkClassID_bod, checkEnrollment } = require('./userClasses-middlewares.js')


//This route will get all information for classes signed up for by a specific user
router.get('/clientclasses/:id', restrictAccess, async (req, res, next) => {
    try {
        //This will stop the client from accessing someone else's information
        if (req.token.subject === parseInt(req.params.id)) {
            const allClientClasses = await ClientClasses.findByClientID(req.params.id)
            res.status(200).json(allClientClasses)
        } else {
            return res.status(403).json({
                message: `Your client_id is ${req.token.subject}. You cannot access info for client_id ${req.params.id}`
            })
        }

    } catch (err) {
        next(err)
    }
})

//This enables a client to sign up for a class which he never signed up for
router.post('/clientclasses', restrictAccess, checkSignupPayload, checkClassID_bod, checkAlreadySignup, async (req, res, next) => {
    try {
        const response = await ClientClasses.signUpClasses(
            {
                class_id: req.body.class_id,
                client_id: req.token.subject
            }
        )

        console.log(response)

        const classInstance = req.classInstance
        console.log(classInstance)
        //Once a client signsup, the number_of_students property is updated. 
        classInstance.number_of_students += 1;
        console.log(classInstance)
        await Classes.updateClass(req.body.class_id, classInstance)

        res.status(200).json({
            message: `You successfully signed up for ${classInstance.class_name}`
        })

    } catch (err) {
        next(err)
    }
})

//this endpoint enables a client to unenroll from an already signed up class
router.delete('/clientclasses/:id', restrictAccess, checkClassID_params, checkEnrollment, async (req, res, next) => {
    try {
        const response = await ClientClasses.dropClasses(req.params.id)
        console.log(response)

        const classInstance = req.classInstance
        console.log(classInstance)

        classInstance.number_of_students -= 1;
        console.log(classInstance)

        await Classes.updateClass(req.params.id, classInstance)

        res.status(200).json({
            message: `You will no longer be participating in ${classInstance.class_name}`,
        })

    } catch (err) {
        next(err)
    }
})


module.exports = router;