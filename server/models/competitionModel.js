import mongoose from "mongoose";
const { Schema, model } = mongoose;

const competitionSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "A competition must have a unique name"],
      unique: [true, "A competition name must be unique"],
      trim: true,
      maxLength: 30,
    },
    logo: {
      type: String,
    },
    currentSeason: {
      type: Schema.Types.ObjectId,
      ref: "Season",
    },
    numberOfAvailableSeasons: {
      type: Number,
      default: 0,
    },
    color: {
      type: String,
      default: "rgb(57, 109, 191)",
    },
    seasons: [
      {
        type: Schema.Types.ObjectId,
        ref: "Season",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Competition = model("Competition", competitionSchema);

export default Competition;
