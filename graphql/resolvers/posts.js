const postsDB = require('../../data/helpers/postDb');
const userDB = require('../../data/helpers/userDb');


module.exports = {

    posts: async (args) => {
        try {
            if (args.id) {
                return userDB.getUserPosts(args.id).then(result => {
                    return result.map(res => ({id: res.id, text: res.text, user_id: res.postedBy}))
                })
            } else {
                return postsDB.get().then((result) => {
                    return result
                }).catch((err) => {
                    console.log(err)
                    throw new Error("Could not fetch posts.")
                });
            }
        } catch (err) {
            console.log(err)
            throw err
        }
    }

}
