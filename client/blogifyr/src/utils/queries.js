import { gql } from "@apollo/client";

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      profile {
        _id
        firstName
        lastName
        fullName
        aboutMe
        avatar
        createdOn
        memberSince
        sites {
          siteId
          name
          url
        }
      }
      blogsCount
      blogs {
        _id
      }
    }
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      profile {
        _id
        firstName
        lastName
        fullName
        aboutMe
        avatar
        createdOn
        memberSince
        sites {
          siteId
          name
          url
        }
      }
      blogsCount
      blogs {
        _id
      }
    }
  }
`;

export const QUERY_BLOGS = gql`
  query blogs($userId: ID) {
    blogs(userId: $userId) {
      _id
      title
      image
      createdOn
      updatedOn
      theme
      posts {
        _id
      }
      postsCount
    }
  }
`;

export const QUERY_SINGLE_BLOG = gql`
  query blog($id: ID!) {
    blog(_id: $id) {
      _id
      title
      image
      createdOn
      updatedOn
      theme
      posts {
        _id
      }
      postsCount
    }
  }
`;

export const QUERY_POSTS = gql`
  query posts($blogId: ID!) {
    posts(blogId: $blogId) {
      _id
      title
      content
      isPublished
      createdOn
      updatedOn
      publishedOn
      reactions {
        reactionId
        type
        user {
          _id
        }
        createdOn
      }
      comments {
        commentId
        commentText
        user {
          _id
        }
        createdOn
      }
      reactionsCount {
        total
        up
        down
      }
      commentsCount
    }
  }
`;

export const QUERY_SINGLE_POST = gql`
  query post($id: ID!) {
    post(_id: $id) {
      _id
      title
      content
      isPublished
      createdOn
      updatedOn
      publishedOn
      reactions {
        reactionId
        type
        user {
          _id
          username
          profile {
            _id
            firstName
            lastName
            fullName
            avatar
          }
        }
        createdOn
      }
      reactionsCount {
        total
        up
        down
      }
      comments {
        commentId
        commentText
        user {
          _id
          username
          profile {
            _id
            firstName
            lastName
            fullName
            avatar
          }
        }
        createdOn
      }
      commentsCount
    }
  }
`;
