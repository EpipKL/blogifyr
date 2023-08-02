import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
        profile {
          _id
        }
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $password: String!, $firstName: String) {
    addUser(username: $username, password: $password, firstName: $firstName) {
      token
      user {
        _id
        username
        profile {
          _id
        }
      }
    }
  }
`;

export const UPDATE_PROFILE = gql`
  mutation updateProfile(
    $firstName: String
    $lastName: String
    $aboutMe: String
    $avatar: String
    $sites: [SiteInput]
  ) {
    updateProfile(
      firstName: $firstName
      lastName: $lastName
      aboutMe: $aboutMe
      avatar: $avatar
      sites: $sites
    ) {
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
    }
  }
`;

export const ADD_BLOG = gql`
  mutation addBlog($title: String!, $image: String, $theme: String) {
    addBlog(title: $title, image: $image, theme: $theme) {
      _id
      username
      blogsCount
      blogs {
        _id
        title
        image
        createdOn
        updatedOn
        theme
      }
    }
  }
`;

export const UPDATE_BLOG = gql`
  mutation updateBlog(
    $id: ID!
    $title: String
    $image: String
    $theme: String
  ) {
    updateBlog(_id: $id, title: $title, image: $image, theme: $theme) {
      _id
      createdOn
      image
      posts {
        _id
      }
      postsCount
      theme
      title
      updatedOn
    }
  }
`;

export const ADD_POST = gql`
  mutation addPost(
    $blogId: ID!
    $title: String!
    $content: String!
    $isPublished: Boolean
  ) {
    addPost(
      blogId: $blogId
      title: $title
      content: $content
      isPublished: $isPublished
    ) {
      _id
      createdOn
      image
      posts {
        _id
        content
        createdOn
        isPublished
        publishedOn
        title
        updatedOn
      }
    }
  }
`;

export const UPDATE_POST = gql`
  mutation updatePost(
    $id: ID!
    $title: String
    $content: String
    $isPublished: Boolean
  ) {
    updatePost(
      _id: $id
      title: $title
      content: $content
      isPublished: $isPublished
    ) {
      _id
      comments {
        commentId
        commentText
        user {
          _id
        }
        createdOn
      }
      commentsCount
      content
      createdOn
      isPublished
      publishedOn
      reactions {
        reactionId
        type
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
      title
      updatedOn
    }
  }
`;

export const ADD_REACTION = gql`
  mutation addReaction($postId: ID!, $type: String!) {
    addReaction(postId: $postId, type: $type) {
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

export const REMOVE_REACTION = gql`
  mutation removeReaction($postId: ID!, $reactionId: ID!) {
    removeReaction(postId: $postId, reactionId: $reactionId) {
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

export const ADD_COMMENT = gql`
  mutation addComment($postId: ID!, $commentText: String!) {
    addComment(postId: $postId, commentText: $commentText) {
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
