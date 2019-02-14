const userResolver = require('./user');
const postsResolver = require('./posts');

module.exports = {
    ...userResolver,
    ...postsResolver
}