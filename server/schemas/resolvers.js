const { AuthenticationError } = require("apollo-server-express");
const {
  Blog,
  Comment,
  Post,
  Profile,
  Reaction,
  Site,
  User,
} = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return await User.findOne({ _id: context.user._id }).populate(
          "profile"
        );
      }

      throw new AuthenticationError("You need to be logged in.");
    },
    user: async (parent, { username }) => {
      return await User.findOne({ username }).populate("profile");
    },
    blogs: async (parent, { userId }) => {
      let id;
      if (!userId) {
        if (context.user) {
          id = context.user._id;
        } else {
          throw new AuthenticationError("You need to be logged in.");
        }
      } else {
        id = userId;
      }

      const user = await User.findById(id)
        .populate("blogs")
        .sort({ "blogs.createdOn": "desc" });

      return [user.blogs[0]];
    },
    blog: async (parent, { _id }) => {
      return await Blog.findById(_id)
        .populate("posts")
        .sort({ "posts.createdOn": "desc" });
    },
    posts: async (parent, { blogId }) => {
      const blog = await Blog.findById(blogId)
        .populate("posts")
        .sort({ "posts.createdOn": "desc" });

      return blog.posts;
    },
    post: async (parent, { _id }) => {
      return await Post.findById(_id)
        .populate({
          path: "reactions.user",
          model: "user",
          populate: { path: "profile", model: "profile" },
        })
        .populate({
          path: "comments.user",
          model: "user",
          populate: { path: "profile", model: "profile" },
        })
        .sort({ "comments.createdOn": "desc" });
    },
  },
  Mutation: {
    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
    addUser: async (parent, { username, password, firstName }) => {
      const profile = await Profile.create({ firstName });
      const user = await User.create({
        username,
        password,
        profile: profile._id,
      });

      const token = signToken(user);

      return { token, user };
    },
    updateProfile: async (parent, args, context) => {
      if (context.user) {
        await Profile.findByIdAndUpdate(context.user.profile, args);

        return await User.findById(context.user._id).populate("profile");
      }

      throw new AuthenticationError("You need to be logged in.");
    },
    addBlog: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id);

        if (!user.blogs || user.blogs.length === 0) {
          const blog = await Blog.create(args);

          return await User.findByIdAndUpdate(
            context.user._id,
            {
              $push: { blogs: blog },
            },
            { new: true }
          )
            .populate("blogs")
            .sort({ "blogs.createdOn": "desc" });
        }

        return user.populate("blogs").sort({ "blogs.createdOn": "desc" });
      }

      throw new AuthenticationError("You need to be logged in.");
    },
    updateBlog: async (parent, { _id, title, image, theme }) => {
      return await Blog.findByIdAndUpdate(
        _id,
        {
          title,
          image,
          theme,
        },
        { new: true }
      );
    },
    addPost: async (parent, { blogId, title, content, isPublished }) => {
      const post = await Post.create({ title, content, isPublished });

      return await Blog.findByIdAndUpdate(
        blogId,
        {
          $push: { posts: post },
        },
        { new: true }
      ).populate({ path: "posts", options: { sort: { createdOn: "desc" } } });
    },
    updatePost: async (parent, { _id, title, content, isPublished }) => {
      const updatedPost = {};
      if (title) {
        updatedPost.title = title;
      }

      if (content) {
        updatedPost.content = content;
      }

      if (typeof isPublished !== "undefined") {
        updatedPost.isPublished = isPublished;
      }
      return await Post.findByIdAndUpdate(_id, updatedPost, { new: true }).sort(
        { "comments.createdOn": "desc" }
      );
    },
    addReaction: async (parent, { postId, type }, context) => {
      if (context.user) {
        return await Post.findByIdAndUpdate(
          postId,
          {
            $push: {
              reactions: {
                type,
                username: context.user.username,
              },
            },
          },
          { new: true }
        ).sort({ "comments.createdOn": "desc" });
      }

      throw new AuthenticationError("You need to be logged in.");
    },
    removeReaction: async (parent, { postId, reactionId }) => {
      return await Post.findByIdAndUpdate(
        postId,
        {
          $pull: {
            reactions: {
              _id: reactionId,
            },
          },
        },
        { new: true }
      ).sort({ "comments.createdOn": "desc" });
    },
    addComment: async (parent, { postId, commentText }, context) => {
      if (context.user) {
        return await Post.findByIdAndUpdate(
          postId,
          {
            $push: {
              comments: {
                commentText,
                username: context.user.username,
              },
            },
          },
          { new: true }
        ).sort({ "comments.createdOn": "desc" });
      }

      throw new AuthenticationError("You need to be logged in.");
    },
  },
};

module.exports = resolvers;
