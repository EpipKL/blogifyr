const { Schema, Types } = require("mongoose");
const {isValidUrl} = require('../utils/helpers');

const siteNames = {
  TWITTER_X: "twitter",
  FACEBOOK: "facebook",
  INSTAGRAM: "instagram",
  THREADS: "threads",
  TIKTOK: "tiktok",
  GITHUB: "github",
  LINKEDIN: "linkedin",
  PERSONAL: "personal",
  PORTFOLIO: "portfolio",
};

const isValidName = function (name) {
  return Object.keys(siteNames).includes(name);
};

const siteSchema = new Schema({
  siteId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  name: {
    type: String,
    required: true,
    validate: [
      isValidName,
      `Incorrect site name. Possible values include: ${Object.keys(siteNames)}`,
    ],
  },
  url: {
    type: String,
    required: true,
    validate: [isValidUrl, "Please enter a valid URL"],
  },
});

module.exports = siteSchema;