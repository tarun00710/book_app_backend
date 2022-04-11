const cookieSession = require("cookie-session");
const express = require("express");
const passport = require("passport");
const app = express();
const cors = require("cors");
const { ConnectionDB } = require("./Connection/ConnectionDB");
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
var session = require('express-session')


app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}))

app.get('/',(req,res)=>{
  res.send("hello")
})

app.use(
  cookieSession({
    name: "session",
    keys: ["Tarun"],
    maxAge: 60 * 60 * 24 * 100,
  })
);
// app.use(express.cookieParser())
// app.use(express.session({secret:'anything'}))

app.use(cookieParser()) // required before session.
app.use(bodyParser.json())
app.use(session({secret: 'keyboard cat',resave: false,
saveUninitialized: true,}))
app.use(passport.initialize());
app.use(passport.session());



ConnectionDB()

const authRoute = require("./routes/auth");
const { User } = require("./model/userModel");
app.use("/auth", authRoute)

app.post('/user/:userId/savesearch',async(req,res) => {
  try {
    const {search} = req.body;
    const {userId} = req.params;
    const getUser = await User.findById({_id:userId})
        if(getUser.userSearch.includes(search)){
          return res.json({success:true,getUser})
        }
        else{
          let findUser = await User.findOneAndUpdate({_id:userId},
            {
              $push : {userSearch : search}},function(error,success){
                if(error)
                console.log(error)
                else
                console.log(success)
            }
            );
            return res.json({success:true,findUser})
      }
  
  } catch (error) {
    console.log(error)
  }
  
})

app.listen("5000", () => {
  console.log("Server is running!");
});
