const { Schema, Types } = require("mongoose");

const isValidUrl = function (url) {
  // The RegEx below was taken from the Full Stack docs, Week 17 Challenge README
  let urlRegEx = new RegExp(
    /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/
  );
  return urlRegEx.test(url);
};

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
    validate: [isValidUrl, "Please ener a valid URL"],
  },
});

module.exports = siteSchema;