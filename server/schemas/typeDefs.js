const { gql } = require("apollo-server-express");

const typeDefs = gql`
    type User {
        _id: id
        username: String!
        email: String!
        profile: Profile!
        blogs: [Blog]
        blogsCount: Int
    }

    type Profile {
        _id: ID
        name: String
        aboutMe: String
        avatar: String
        customLogo: String
        createdOn: String
        memberSince: String
        sites: [Site]
    }

    type Site {
        siteId: ID
        name: String!
        url: String!
    }

    type Blog {
        _id: ID
        title: String!
        createdOn: String
        updatedOn: String
        theme: String
        blogPath: String
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
        username: String!
        createdOn: String
    }

    type Comment {
        commentId: ID
        commentText: String!
        username: String!
        createdOn: String
    }

    type ReactionsCount {
        total: Int
        up: Int
        down: Int
    }
`;

module.exports = typeDefs;
