const { gql } = require("apollo-server-express");

const typeDefs = gql`
    type User {
        _id: ID
        username: String!
        profile: Profile!
        blogs: [Blog]
        blogsCount: Int
    }

    type Profile {
        _id: ID
        firstName: String
        lastName: String
        fullName: String
        aboutMe: String
        avatar: String
        createdOn: String
        memberSince: String
        sites: [Site]
    }

    type Site {
        siteId: ID
        name: String!
        url: String!
    }

    input SiteInput {
        name: String!
        url: String!
    }

    type Blog {
        _id: ID
        title: String!
        image: String
        createdOn: String
        updatedOn: String
        theme: String
        posts: [Post]
        postsCount: Int
    }

    type Post {
        _id: ID
        title: String!
        content: String!
        isPublished: Boolean
        createdOn: String
        updatedOn: String
        publishedOn: String
        reactions: [Reaction]
        comments: [Comment]
        reactionsCount: ReactionsCount
        commentsCount: Int
    }

    type Reaction {
        reactionId: ID
        type: String!
        user: User!
        createdOn: String
    }

    type Comment {
        commentId: ID
        commentText: String!
        user: User!
        createdOn: String
    }

    type ReactionsCount {
        total: Int
        up: Int
        down: Int
    }

    type Auth {
        token: ID
        user: User
    }

    type Query {
        me: User
        user(username: String!): User
        blogs(userId: ID): [Blog]
        blog(_id: ID!): Blog
        posts(blogId: ID!): [Post]
        post(_id: ID!): Post
    }

    type Mutation {
        login(username: String!, password: String!): Auth
        addUser(username: String!, password:String!, firstName: String): Auth
        updateProfile(firstName: String, lastName: String, aboutMe: String, avatar: String, sites: [SiteInput]): User
        addBlog(title: String!, image: String, theme: String): User
        updateBlog(_id: ID!, title: String, image: String, theme: String): Blog
        addPost(blogId: ID!, title: String!, content: String!, isPublished: Boolean): Blog
        updatePost(_id: ID!, title: String, content: String, isPublished: Boolean): Post
        addReaction(postId: ID!, type: String!): Post
        removeReaction(postId: ID!, reactionId: ID!): Post
        addComment(postId: ID!, commentText: String!): Post
    }
`;

module.exports = typeDefs;
