const { Schema, Types } = require("mongoose");

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
  },
}, {
  id: false,
  _id: false
});

module.exports = siteSchema;