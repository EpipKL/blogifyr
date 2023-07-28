const db = require("./connection");
const { User, Profile, Blog, Post } = require("../models");

const users = [
  {
    username: "sergio",
    email: "sergio@email.com",
    password: "password1234",
  },
  {
    username: "kyle",
    email: "kyle@email.com",
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
            type: 'UP',
            username: 'kyle'
        }
    ],
    comments: [
        {
            commentText: 'Awesome!',
            username: 'kyle'
        }
    ]
  },
  {
    title: "Introduccion",
    content: "Mi nombre es Sergio, soy programador de backend.",
    reactions: [
        {
            type: 'UP',
            username: 'kyle'
        },
        {
            type: 'DOWN',
            username: 'sergio'
        }
    ],
    comments: [
        {
            commentText: 'Bienvenido',
            username: 'kyle'
        },
        {
            commentText: 'The thumbs down is just a test!',
            username: 'sergio'
        }
    ]
  },
  {
    title: "Intro",
    content: `My name is Kyle, I'm your FE developer.`,
    reactions: [
        {
            type: 'UP',
            username: 'sergio'
        }
    ]
  },
];

db.once("open", async () => {
  await User.deleteMany();
  await Profile.deleteMany();
  await Blog.deleteMany();
  await Post.deleteMany();

  const sergioProfile = await Profile.create(profiles[0]);
  users[0].profile = sergioProfile._id;
  users[0].blogs = [];

  const kyleProfile = await Profile.create({});
  users[1].profile = kyleProfile._id;
  users[1].blogs = [];

  for (let i = 0; i < posts.length; i++) {
    const newPost = await Post.create(posts[i]);
    blogs[i].posts = [newPost._id];
  }

  for (let i = 0; i < blogs.length; i++) {
    const newBlog = await Blog.create(blogs[i]);

    if (i < 2) {
        users[0].blogs.push(newBlog._id);
      } else {
        users[1].blogs.push(newBlog._id);
      }
  }

  for (const user of users) {
    await User.create(user);
  }

  console.log("Data seeded!");

  process.exit();
});
