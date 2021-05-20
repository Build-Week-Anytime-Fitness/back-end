const router = require('express').Router();

router.get('/', (req, res, next) => {
    try {
        return res.status(200).json({
            message: "Fitness Classes API is working!"
        })

    } catch {
        next(err)
    }
})

module.exports = router;