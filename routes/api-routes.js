//work in progress
const db = require("../models");

module.exports = (app) => {
  app.get("/api/workouts", (req, res) => {
    console.log("GET workouts");
    db.Workout.find({}).then((dbWorkout) => {
      res.json(dbWorkout);
    });
  });

  app.get("/api/workouts/range", (req, res) => {
    console.log("GET workouts");
    let startDate = new Date().setDate(new Date().getDate() -7);
    //https://mongoosejs.com/docs/queries.html
    let endDate = new Date();
    db.Workout.find({
      day: {
        $gte: startDate,
        $lte: endDate
      }
    }).then((dbWorkout) => {
      res.json(dbWorkout);
    });
  });

  //add exercise
  app.put("/api/workouts/:id", async (req, res) => {
    console.log(req.body);
    const { id } = req.params;
    const type = req.body.type || "";
    const name = req.body.name || "";
    const duration = req.body.duration || 0;
    const weight = req.body.weight || 0;
    const reps = req.body.reps || 0;
    const sets = req.body.sets || 0;
    const distance = req.body.distance || 0;
    const newExercise = {
      "type": type,
      "name": name,
      "duration": duration,
      "weight": weight,
      "reps": reps,
      "sets": sets,
      "distance": distance,
    };
    try {
      const updatedWorkout = await db.Workout.findByIdAndUpdate(
        id,
        { $push: { "exercises": newExercise } },
        { upsert: true, new: true }
      );
      console.log(updatedWorkout, "updated workout");
      res.status(201).json(updatedWorkout);
    } catch (error) {
      console.log("error :48", error);
      res.send(error);
    }
  });

  //create
  app.post("/api/workouts", async (req, res) => {
    const newWorkout = new db.Workout({
      exercises: [],
    });
    const createdWorkout = await newWorkout.save();
    res.status(201).json(createdWorkout);
  });
};
