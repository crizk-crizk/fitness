const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");

const PORT = process.env.PORT || 4000;

const app = express();

//connect to mongoose
mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindFindAndModify: false,
});

//loggin middleware
app.use(morgan("dev"));

//post request middlewares
app.use(express.urlencoded({ extended: true }))
// app.use

//static folder

//routes
app.get("/", (req, res)=>{
  console.log("Hello dude, I'm connected")
})

app.listen(PORT, ()=> {
  console.log(`You're up and running on port ${PORT}`);
})