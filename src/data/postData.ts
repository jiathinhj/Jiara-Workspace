import avatar_thinh from "../images/avatar/thinh.jpg";
import avatar_dat from "../images/avatar/dat.jpg";
import avatar_lu1 from "../images/avatar/lu1.jpg";
import avatar_lu4 from "../images/avatar/lu4.jpg";
import avatar_lu5 from "../images/avatar/lu5.jpg";
import avatar_lu6 from "../images/avatar/lu6.jpg";
import avatar_lu7 from "../images/avatar/lu7.jpg";
import avatar_li from "../images/avatar/li.jpg";
import avatar_lan from "../images/avatar/lan.jpg";

const postData = [
  {
    id: 1,
    postText: `meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meowmeow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow`,
    hashTags: ["meow", "meow meow meow"],
    imgs: [avatar_lu4, avatar_lu5, avatar_lu6, avatar_lu7],
    authorName: "Lu",
    authorAvt: avatar_lu1,
    comments: [],
  },
  {
    id: 2,
    postText: `Meo meo meo meo meo meo meo meo `,
    hashTags: [],
    imgs: [
      avatar_li
    ],
    authorName: "Li",
    authorAvt: avatar_li,
    comments: [
      {
        id: 1,
        commentText:
          "Meo meo meo meo meo meo meo meo",
        authorName: "Lu",
        authorAvt: avatar_lu4,
        replies: [
          {
            id: 1,
            replyText: "I am a bird heheheheheheheh",
            authorName: "Lan",
            authorAvt: avatar_lan,
          },
        ],
      },
    ],
  },
  {
    id: 3,
    postText:
      "My name is Thinh",
    hashTags: [],
    imgs: [],
    authorName: "Jiathinhj",
    authorAvt: avatar_thinh,
    comments: [
      {
        id: 1,
        commentText:
          "Meo meo meo meo meo meo meo meo",
        authorName: "Lu",
        authorAvt: avatar_lu4,
        replies: [
          {
            id: 1,
            replyText: "Heheheheheheheh",
            authorName: "Lan",
            authorAvt: avatar_lan,
          },
          {
            id: 2,
            replyText: "I am Dat",
            authorName: "Dat",
            authorAvt: avatar_dat,
          },
        ],
      },
      {
        id: 2,
        commentText:
          "I am meo meo",
        authorName: "Li",
        authorAvt: avatar_li,
        replies: [],
      },
    ],
  },
];

export default postData;
