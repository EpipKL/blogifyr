const { Schema, Types } = require("mongoose");

const reactionTypes = {
  UP: "up",
  DOWN: "down",
};

const isValidType = function (type) {
  return Object.keys(reactionTypes).includes(type);
};

const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  type: {
    type: String,
    required: true,
    validate: [
      isValidType,
      `Incorrect type. Possible values include: ${Object.keys(reactionTypes)}`,
    ],
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

module.exports = reactionSchema;
