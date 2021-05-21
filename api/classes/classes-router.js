const router = require('express').Router();
const Classes = require("./users-model.js")

router.get('/classes', async (req, res, next) => {
    try {
        const allClasses = await Classes.find()
        res.status(200).json(allClasses)

    } catch (err) {
        next(err)
    }
})


module.exports = router;

