const { Schema, Types } = require("mongoose");

const commentSchema = new Schema({
  commentId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  commentText: {
    type: String,
    required: true,
    trim: true,
    // maxLength: ??,
  },
  username: {
    type: String,
    required: true,
    trim: true,
  },
  createdOn: {
    type: Date,
    default: new Date(),
  },
});

module.exports = commentSchema;