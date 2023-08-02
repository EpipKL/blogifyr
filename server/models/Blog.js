const mongoose = require("mongoose");
const { Schema } = mongoose;
const { formatDateTime } = require("../utils/helpers");

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minLength: 1,
      maxLength: 50,
    },
    image: {
      type: String,
    },
    createdOn: {
      type: Date,
      default: new Date(),
      get: formatDateTime,
    },
    updatedOn: {
      type: Date,
      default: new Date(),
      get: formatDateTime,
    },
    theme: {
      type: String, // this would be converted to string by FE
      trim: true,
    },
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "post",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

blogSchema.virtual("postsCount").get(function () {
  return this.posts.length;
});

const Blog = mongoose.model("blog", blogSchema);

module.exports = Blog;
