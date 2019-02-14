const userDB = require('../../data/helpers/userDb');

const userPosts =  async (userId) => {
    try {
        const posts = await userDB.getUserPosts(userId);
        return posts.map(post => {
            return normalizeUsersPost(post, userId)
        })
    } catch(err) {
        console.log(err)
        throw err
    }
}
const normalizeUser = (user) => {
    return {
        ...user,
        postsList: userPosts.bind(this, user.id)
    }
}

const normalizeUsersPost = (post, userId) => {
    return {
        id: post.id,
        text: post.text,
        user_id: userId,
        creator: findCreator(userId)
    }
}

const findCreator = async (userId) => {
    const creator = await userDB.getById(userId);
    return normalizeUser(creator)
}

const normalizePost = async (post) => {
    return {
        ...post,
        creator: findCreator(post.user_id)
    }
}

exports.normalizePost = normalizePost;
exports.normalizeUser = normalizeUser;