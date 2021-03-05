const db = require("../models");

module.exports = (app) => {
  app.get("/api/workouts", (req, res) => {
    console.log("GET workouts");
    db.Workout.find({})
    .then((dbWorkout) => {
      res.json(dbWorkout);
    });
  });

  app.put("/api/workouts/:id", (req, res) => {
    db.Workout.findOneAndUpdate({ id }, req.body).then((dbWorkout) => {
      res.json(dbWorkout);
    });
  });
  //create
  app.post("/api/workouts", (req, res) => {
    db.Workout.create(req.body).then((dbWorkout) => res.json(dbWorkout));
  });
};
