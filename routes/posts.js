const express = require('express');
const router = express.Router();
const postsDB = require('../data/helpers/postDb');


router.post('', (req, res, next) => {
    const { text, userId } = req.body;
    if (!text || !userId) {
        res.status(404).json({errorMessage: "Please provide text and userId fields."})
    } else {
        postsDB.insert({text, user_id: userId}).then((result) => {
            if (!result) {
                res.status(404).json({errorMessage: "Could not create that post."})
            } else {
                res.status(201).json(result)
            }
        }).catch((err) => {
            console.log(err);
            res.status(500).json({errorMessage: "Could not create that post."})
        });
    }
})
router.get('', (req, res, next) => {
    postsDB.get().then((result) => {
        if (!result.length > 0) {
            res.status(404).json({errorMessage: "There is no 'posts' field in our database." })
        } else {
            res.status(200).json(result)
        }
    }).catch((err) => {
        console.log(err)
        res.status(500).json({errorMessage: "Could not fetch posts."})
    });
})
router.get('/:id', (req,res, next) => {
    postsDB.getById(req.params.id).then((result) => {
        if (!result) {
            res.status(404).json({errorMessage: "There is no post by that id." })
        } else {
            res.status(200).json(result)
        }
    }).catch((err) => {
        console.log(err)
        res.status(500).json({errorMessage: "Could not fetch post."})
    });
})
router.delete('/:id', (req, res, next) => {
    postsDB.remove(req.params.id).then((result) => {
        if (result < 0) {
            res.status(404).json({errorMessage: "Could not delete post."})
        } else {
            res.status(201).json(result)
        }
    }).catch((err) => {
        console.log(err);
        res.status(500).json({errorMessage: "Could not delete post."})
    });
})
router.put('/:id', (req, res, next) => {
    const { text } = req.body;
    if (!text) {
        res.status(404).json({errorMessage: "Please provide a text field."})
    } else {
        postsDB.update( req.params.id ,{text}).then((result) => {
            if (!result) {
                res.status(404).json({errorMessage: "Could not update that post."})
            } else {
                res.status(201).json(result)
            }
        }).catch((err) => {
            console.log(err);
            res.status(500).json({errorMessage: "Could not update that post."})
        });
    }
})




module.exports = router;