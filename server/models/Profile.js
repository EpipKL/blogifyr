const mongoose = require("mongoose");

const { Schema } = mongoose;

const siteSchema = require("./Site");

const profileSchema = new Schema(
  {
    name: {
      type: String,
    },
    aboutMe: {
      type: String,
    },
    avatar: {
      type: String,
    },
    customLogo: {
      type: String,
    },
    sites: [siteSchema],
    createdOn: {
      type: Date,
      default: new Date(),
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

profileSchema.virtual("memberSince").get(function () {
  const month = this.createdOn.getMonth();
  const day = this.createdOn.getDate();
  const year = this.createdOn.getYear();

  return `${month}-${day}-${year}`;
});

const Profile = mongoose.model("profile", profileSchema);

module.exports = Profile;
