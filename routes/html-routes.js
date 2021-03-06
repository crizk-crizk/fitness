const path = require('path');

module.exports = (app) => {
  //exercise
  app.get("/exercise", (req, res) =>{
    res.sendFile(path.join(__dirname, '../public/exercise.html'))
  });
  //stats
  app.get("/stats", (req, res) =>{
    res.sendFile(path.join(__dirname, '../public/stats.html'))
  });
}