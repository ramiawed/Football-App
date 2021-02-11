import mongoose from "mongoose";
const { Schema, model } = mongoose;

const statisticSchema = new Schema({
  status: {
    type: String,
    enum: ["goal", "red card", "yellow card"],
    default: "goal",
  },
  minutes: {
    type: Number,
    required: [true, "A status should have a minute"],
  },
});

const Statistic = model("Statistic", statisticSchema);

export default Statistic;
