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
        user_id: String!
    }
    
    input UserInput {
        name: String!
    }
    input PostInput {
        text: String!
    }
    type RootQuery {
        users: [User!]!
        posts(id: Int): [Post!]!
    }
    type RootMutation {
        createUser(userInput: UserInput): User!
        createPost(postInput: PostInput): Post!
        deletePost(postId: Int!): Post!
        deleteUser(userId: Int!): User!
        updatePost(postInput: PostInput): Post!
        updateUser(userInput: UserInput): User!
    }
    schema {
        query: RootQuery,
        mutation: RootMutation
    }
`)