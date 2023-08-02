const jwt = require("jsonwebtoken");

const secret = "adhesive-extend-drab-preachy";
const expiration = "2h";

module.exports = {
  authMiddleware: function ({ req }) {
    let token = req.body.token || req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }

    if (!token) {
      return req;
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch (err) {
      console.log("Invalid token");
      console.log(err);
    }

    return req;
  },
  signToken: function ({ _id, username, profile }) {
    const payload = {
      _id,
      username,
      profile,
      // profile: {
      //   _id: profile._id,
      //   firstName: profile.firstName,
      //   lastName: profile.lastName,
      //   fullName: `${profile.firstName} ${profile.lastName}`,
      // },
    };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
