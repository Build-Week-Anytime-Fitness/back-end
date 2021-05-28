const router = require('express').Router();
const Classes = require("./classes-model");
const { restrictAccess, checkClassPayload, checkNameUnique, checkClassID_params } = require("./classes-middlewares.js");


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
        const instructorClasses = await Classes.findByInstructorId(req.params.instId)
        res.status(200).json(instructorClasses)
    } catch (err) {
        next(err)
    }
})

router.post('/classes', restrictAccess, checkClassPayload, checkNameUnique, async (req, res, next) => {
    try {
        //Checks if the user is an instructor or not before allowing them to add classes. 
        //Instructor can only add classes for himself and not for anybody else
        if (req.token.is_instructor === true && req.token.subject === req.body.instructor_id) {
            const newClass = await Classes.add(req.body)
            console.log(newClass)
            console.log(newClass.class_name)
            res.status(200).json({
                message: `You just added a bit of goodness to this world with your newClass: ${newClass.class_name}!`
            })
        } else if (req.token.is_instructor === false) {
            return res.status(400).json({
                message: "You are not an instructor!!!"
            })
        } else if (req.token.subject !== req.body.instructor_id) {
            return res.status(400).json({
                message: "You cannot add a fitness class for someone else!!!"
            })
        }

    } catch (err) {
        next(err)
    }
})


router.delete('/classes/:id', restrictAccess, checkClassID_params, async (req, res, next) => {
    try {
        if (req.token.is_instructor === true && req.token.subject === req.classInstance.instructor_id) {
            await Classes.remove(req.params.id)
            return res.status(200).json({
                message: 'class successfully deleted!',
                deletedClass: req.classInstance,
            })
        } else if (req.token.is_instructor === false) {
            return res.status(400).json({
                message: "You are not an instructor!!!"
            })
        } else if (req.token.subject !== req.body.instructor_id) {
            return res.status(400).json({
                message: "You cannot delete someone else's class!!!"
            })
        }
    } catch (err) {
        next(err)
    }
})



router.put('/classes/:id', checkClassPayload, restrictAccess, checkClassID_params, async (req, res, next) => {
    try {
        if (req.token.is_instructor === true && req.token.subject === req.body.instructor_id && req.classInstance.instructor_id === req.body.instructor_id) {
            const changedClass = await Classes.updateClass(req.params.id, req.body)
            return res.status(200).json({
                message: `class: ${changedClass.class_name} with id: ${changedClass.id} successfully updated!`
            })
        } else if (req.token.is_instructor === false) {
            return res.status(400).json({
                message: "You are not an instructor!!!"
            })
        } else if (req.token.subject !== req.body.instructor_id) {
            return res.status(400).json({
                message: "Check the instructor_id!!!"
            })
        } else if (req.classInstance.instructor_id !== req.body.instructor_id) {
            return res.status(400).json({
                message: "Class does not belong to you!"
            })
        }
    } catch (err) {
        next(err)
    }
})


module.exports = router;

