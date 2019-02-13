const { buildSchema } = require('graphql');


module.exports = buildSchema(`
    type User {
        id: Int!
        name: String!
        PostsList: [Post!]!
    }
    type Post {
        id: Int!
        text: String!
        user_id: Int!
    }
    RootQuery {
        users: [User!]!
        posts: [Post!]!
    }
    schema {
        query: RootQuery
        mutation: RootMutation
    }
`)