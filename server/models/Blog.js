const mongoose = require("mongoose");

const { Schema } = mongoose;

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minLength: 1,
      maxLength: 50, // do we want to increase this?
    },
    createdOn: {
      type: Date,
      default: new Date(),
    },
    updatedOn: {
      type: Date,
      default: new Date(),
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
    },
    id: false,
  }
);

blogSchema.virtual('postsCount').get(function() {
    return this.posts.length;
});

blogSchema.virtual('blogPath').get(function() {
    const pathLength = this.title.length < 20 ? this.title.length : 20;

    // I took this code from https://www.geeksforgeeks.org/replace-special-characters-in-a-string-with-underscore-_-in-javascript/
    const blogPath = this.title.substring(0, pathLength).replace(/[&\/\\#, +()$~%.'":*?<>{}]/g, '_');

    return blogPath[pathLength - 1] === '_' ? blogPath[pathLength - 2] : blogPath[pathLength - 1];
})

const Blog = mongoose.model("blog", blogSchema);

module.exports = Blog;
