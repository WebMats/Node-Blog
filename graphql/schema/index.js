const { buildSchema } = require('graphql');


module.exports = buildSchema(`
    type User {
        id: Int!
        name: String!
        postsList: [Post!]!
    }
    type Post {
        id: Int!
        text: String!
        user_id: Int!
        creator: User!
    }
    input UserInput {
        name: String!
    }
    input PostInput {
        postId: Int!
        text: String!
    }
    type RootQuery {
        users(id: Int): [User!]!
        posts: [Post!]!
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