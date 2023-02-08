const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");

const PORT = 5000;
const app = express();

// use session middle ware to create session
app.use(
  session({
    secret: "SECRET KEY",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      // store session inside mongodb store in mongodb db
      mongoUrl:
        "mongodb+srv://irfandayan:dayan45@nodeappoauthdb.00ohc.mongodb.net/nodeappoauthdb?retryWrites=true&w=majority", // db: NodeAppOAuthDB
    }),
  })
);
// first understand the problem, and then know why we need express session
// express-session --> https://www.youtube.com/watch?v=hKYjSgyCd60

// EXAMPLE # 1
// let viewCount = 0;
// app.get("/", (req, res) => {
//   // Problem
//   //   viewCount += 1;
//   //   res.send(`You have visted this page ${viewCount}`);

//   // Solution via session creation
//   req.session.viewCount += 1;
//   res.send(`You have visted this page ${req.session.viewCount}`);
// });

// EXAMPLE #2 - store session inside mongodb

// create sessoin and store inside db
// note session connect.id is stored in browser cookies with httponly=true
// ref: https://meghagarwal.medium.com/storing-sessions-with-connect-mongo-in-mongodb-64d74e3bbd9c
app.get("/", (req, res, next) => {
  req.session.user = {
    uuid: "4324324-23432432-234324324",
  };
  req.session.save((err) => {
    if (err) {
      console.log(err);
    } else {
      res.send(req.session.user);
    }
  });
});
// destroy session and delete sessoin from db
app.get("/end", (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    } else {
      res.send("Session is destroyed");
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
