const db = require("./connection");
const { User, Profile, Blog, Post } = require("../models");

const users = [
  {
    username: "sergio",
    password: "password1234",
  },
  {
    username: "kyle",
    password: "password1234",
  },
];

const profiles = [
  {
    name: "Sergio",
    aboutMe: "Hello!",
    sites: [
      {
        name: "GITHUB",
        url: "https://github.com/sergiorodriguezdev",
      },
    ],
  },
];

const blogs = [
  {
    title: `Sergio's blog`,
  },
  {
    title: "Blog de Sergio",
  },
  {
    title: `Kyle's blog`,
  },
];

const posts = [
  {
    title: "Intro",
    content: `My name is Sergio, I'm your BE developer.`,
    reactions: [
      {
        type: "UP",
        user: "kyle",
      },
    ],
    comments: [
      {
        commentText: "Awesome!",
        user: "kyle",
      },
    ],
  },
  {
    title: "Introduccion",
    content: "Mi nombre es Sergio, soy programador de backend.",
    reactions: [
      {
        type: "UP",
        user: "kyle",
      },
      {
        type: "DOWN",
        user: "sergio",
      },
    ],
    comments: [
      {
        commentText: "Bienvenido",
        user: "kyle",
      },
      {
        commentText: "The thumbs down is just a test!",
        user: "sergio",
      },
    ],
  },
  {
    title: "Intro",
    content: `My name is Kyle, I'm your FE developer.`,
    reactions: [
      {
        type: "UP",
        user: "sergio",
      },
    ],
    comments: [],
  },
];

db.once("open", async () => {
  await User.deleteMany();
  await Profile.deleteMany();
  await Blog.deleteMany();
  await Post.deleteMany();

  const sergioProfile = await Profile.create(profiles[0]);
  users[0].profile = sergioProfile._id;
  const sergioUser = await User.create(users[0]);

  const kyleProfile = await Profile.create({});
  users[1].profile = kyleProfile._id;
  const kyleUser = await User.create(users[1]);

  for (let i = 0; i < posts.length; i++) {
    for (let j = 0; j < posts[i].reactions.length; j++) {
      if (posts[i].reactions[j].user === "sergio") {
        posts[i].reactions[j].user = sergioUser._id;
      } else {
        posts[i].reactions[j].user = kyleUser._id;
      }
    }

    for (let j = 0; j < posts[i].comments.length; j++) {
      if (posts[i].comments[j].user === "sergio") {
        posts[i].comments[j].user = sergioUser._id;
      } else {
        posts[i].comments[j].user = kyleUser._id;
      }
    }

    const newPost = await Post.create(posts[i]);
    blogs[i].posts = [newPost._id];
  }

  for (let i = 0; i < blogs.length; i++) {
    const newBlog = await Blog.create(blogs[i]);

    if (i < 2) {
      await User.findByIdAndUpdate(sergioUser._id, {
        $addToSet: {
          blogs: newBlog,
        },
      });
    } else {
      await User.findByIdAndUpdate(kyleUser._id, {
        $addToSet: {
          blogs: newBlog,
        },
      });
    }
  }

  console.log("Data seeded!");

  process.exit();
});
