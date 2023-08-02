const { Schema, Types } = require("mongoose");
const { formatDateTime } = require("../utils/helpers");

const reactionTypes = {
  UP: "up",
  DOWN: "down",
};

const isValidType = function (type) {
  return Object.keys(reactionTypes).includes(type);
};

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    type: {
      type: String,
      required: true,
      validate: [
        isValidType,
        `Incorrect type. Possible values include: ${Object.keys(
          reactionTypes
        )}`,
      ],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    createdOn: {
      type: Date,
      // default: new Date(),
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

module.exports = reactionSchema;
