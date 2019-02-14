const express = require('express');
const router = express.Router();
const userDB = require('../data/helpers/userDb');
const nameValidator = require('../middleware/nameValidator');


router.post('', nameValidator, (req, res, next) => {
    const { name } = req.body;
    if (!name) {
        res.status(404).json({errorMessage: "Please provide a name field."})
    } else {
        userDB.insert({name}).then((result) => {
            if (!result) {
                res.status(404).json({errorMessage: "Could not create that user."})
            } else {
                res.status(201).json(result)
            }
        }).catch((err) => {
            console.log(err);
            res.status(500).json({errorMessage: "Could not create that user."})
        });
    }
})
router.get('', (req, res, next) => {
    userDB.get().then((result) => {
        if (!result.length > 0) {
            res.status(404).json({errorMessage: "There is no 'user' field in our database." })
        } else {
            res.status(200).json(result)
        }
    }).catch((err) => {
        console.log(err)
        res.status(500).json({errorMessage: "Could not fetch users."})
    });
})
router.get('/:id', (req,res, next) => {
    userDB.getById(req.params.id).then((result) => {
        if (!result) {
            res.status(404).json({errorMessage: "There is no user by that id." })
        } else {
            res.status(200).json(result)
        }
    }).catch((err) => {
        console.log(err)
        res.status(500).json({errorMessage: "Could not fetch user."})
    });
})
router.delete('/:id', (req, res, next) => {
    userDB.remove(req.params.id).then((result) => {
        if (result < 0) {
            res.status(404).json({errorMessage: "Could not delete user."})
        } else {
            res.status(201).json(result)
        }
    }).catch((err) => {
        console.log(err);
        res.status(500).json({errorMessage: "Could not delete user."})
    });
})
router.put('/:id', nameValidator, (req, res, next) => {
    const { name } = req.body;
    if (!name) {
        res.status(404).json({errorMessage: "Please provide a name field to update."})
    } else {
        userDB.update( req.params.id ,{name}).then((result) => {
            if (!result) {
                res.status(404).json({errorMessage: "Could not update that user."})
            } else {
                res.status(201).json(result)
            }
        }).catch((err) => {
            console.log(err);
            res.status(500).json({errorMessage: "Could not update that user."})
        });
    }
})
router.get('/posts/:id', async (req, res, next) => {
    const user = await userDB.getById(req.params.id);
    if (!user) {
        res.status(404).json({errorMessage: "There is no user with this id."})
    } else {
        const userPosts = await userDB.getUserPosts(req.params.id);
        res.status(200).json(userPosts);
    }
})



module.exports = router;