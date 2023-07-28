const mongoose = require("mongoose");

const { Schema } = mongoose;

const reactionSchema = require("./Reaction");
const commentSchema = require("./Comment");

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minLength: 1,
      maxLength: 50, // do we want to increase this?
    },
    content: {
      type: String,
      required: true,
      trim: true,
      minLength: 1,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    createdOn: {
      type: Date,
      default: new Date(),
    },
    updatedOn: {
      type: Date,
      default: new Date(),
    },
    publishedOn: {
        type: Date,
    },
    reactions: [reactionSchema],
    comments: [commentSchema]
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

postSchema.pre('save', async function (next) {
    // Update publishedOn date if isPublished is changed to true
  if (this.isModified("isPublished") && this.isPublished) {
    this.publishedOn = new Date();
  }

  next();
});

postSchema.virtual('commentsCount').get(function() {
    return this.comments.length;
});

postSchema.virtual('reactionsCount').get(function() {
    const reactionsCount = {
        total: this.reactions.length,
        up: this.reactions.filter(reaction => reaction.type === 'UP').length,
        down: this.reactions.filter(reaction => reaction.type === 'DOWN').length,
    }

    return reactionsCount;
});

const Post = mongoose.model("post", postSchema);

module.exports = Post;