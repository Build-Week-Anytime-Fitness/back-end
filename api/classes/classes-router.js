const router = require('express').Router();
const Classes = require("./classes-model");
const { restrictAccess, checkClassPayload } = require("./classes-middlewares.js");


//This will get all the classes currently on offer. 
router.get('/classes', restrictAccess, async (req, res, next) => {
    try {
        const allClasses = await Classes.find()
        res.status(200).json(allClasses)

    } catch (err) {
        next(err)
    }
})


//This will get all the classes offered by a specific instructor
router.get('/classes/:instId', restrictAccess, async (req, res, next) => {
    try {
        const instructorClasses = await Classes.findById(req.params.instId)
        res.status(200).json(instructorClasses)
    } catch (err) {
        next(err)
    }
})

router.post('/classes', restrictAccess, checkClassPayload, async (req, res, next) => {
    try {
        //Checks if the user is an instructor or not before allowing them to add classes. 
        if (req.token.is_instructor === true) {
            const response = await Classes.add(req.body)
            res.status(200).json({
                message: "You just added a bit of goodness to this world!"
            })
        } else {
            return res.status(400).json({
                message: "You are not an instructor!!!"
            })
        }

    } catch (err) {
        next(err)
    }
})


module.exports = router;

