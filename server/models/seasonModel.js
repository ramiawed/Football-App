import mongoose from "mongoose";
const { Schema, model } = mongoose;

const seasonSchema = new Schema(
  {
    code: {
      type: String,
      required: [true, "A season must have a code like 2020-2021"],
      trim: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    currentMatchday: {
      type: Number,
      default: 0,
    },
    winner: {
      type: Schema.Types.ObjectId,
      ref: "Club",
    },
    competition: {
      type: Schema.Types.ObjectId,
      ref: "Competition",
    },
    competition: {
      type: Schema.Types.ObjectId,
      ref: "Competition",
      required: true,
    },
    clubs: [
      {
        type: Schema.Types.ObjectId,
        // required: true,
        ref: "club",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Season = model("Season", seasonSchema);

export default Season;
