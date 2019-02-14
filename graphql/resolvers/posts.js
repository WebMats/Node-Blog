const postsDB = require('../../data/helpers/postDb');
const userDB = require('../../data/helpers/userDb');
const { normalizePost  } = require('./shared');


module.exports = {
    posts: async (args) => {
        try {
            return postsDB.get().then((result) => {
                return result.map(post => {
                    return normalizePost(post)
                })
            }).catch((err) => {
                console.log(err)
                throw new Error("Could not fetch posts.")
            });
        } catch (err) {
            console.log(err)
            throw err
        }
    },
    updatePost: async (args) => {
        try {
            return postsDB.update(args.postInput.postId , {text: args.postInput.text}).then( async (result) => {
                return await postsDB.getById(args.postInput.postId)
            }).catch((err) => {
                console.log(err);
                throw new Error("Could not update that post.")
            });
        } catch(err) {
            console.log(err)
            throw err
        }
    }
}
