const mongoose = require("mongoose");
const { Schema } = mongoose;
const siteSchema = require("./Site");
const { formatDateTime, formatDate } = require("../utils/helpers");

const profileSchema = new Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    aboutMe: {
      type: String,
    },
    avatar: {
      type: String,
    },
    sites: [siteSchema],
    createdOn: {
      type: Date,
      default: new Date(),
      get: formatDateTime,
    },
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

profileSchema.virtual("memberSince").get(function () {
  return `Member since ${formatDate(this.createdOn)}`;
});

profileSchema.virtual("fullName").get(function () {
  if (this.firstName && this.lastName) {
    return `${this.firstName} ${this.lastName}`;
  } else if (this.firstName) {
    return `${this.firstName}`;
  } else if (this.lastName) {
    return `${this.lastName}`;
  } else {
    return '';
  }
});

const Profile = mongoose.model("profile", profileSchema);

module.exports = Profile;
