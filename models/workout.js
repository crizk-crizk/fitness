// ? Something isn't right here
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema(
  {
    day: {
      $type: Date,
      default: Date.now,
    },
    exercises: [
      {
        type: String,
        name: String,
        duration: Number,
        weight: Number,
        reps: Number,
        sets: Number,
        distance: Number,
      },
    ],
  },
  {
    typeKey: "$type",
  }
);

WorkoutSchema.virtual("totalDuration").get(function () {
  return this.exercises.reduce((accummulator, currentValue) => {
    return accummulator + currentValue.duration;
  }, 0);
});

WorkoutSchema.set("toJSON", {
  virtuals: true,
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
