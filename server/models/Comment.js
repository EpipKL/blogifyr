const { Schema, Types } = require("mongoose");
const { formatDateTime } = require("../utils/helpers");

const commentSchema = new Schema(
  {
    commentId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    commentText: {
      type: String,
      required: true,
      trim: true,
      maxLength: 280,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    createdOn: {
      type: Date,
      default: new Date(),
      get: formatDateTime,
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

module.exports = commentSchema;
