import mongoose from "mongoose";
const { Schema, model } = mongoose;

const playerSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "A player must have a name"],
      trim: true,
      maxlength: 50,
    },
    position: {
      type: String,
      enum: ["Goalkeeper", "Defender", "Midfielder", "Attacker", "Unknown"],
      default: "Unknown",
    },
    dateOfBirth: {
      type: Date,
    },
    countryOfBirth: {
      type: String,
      trim: true,
    },
    nationality: {
      type: String,
      trim: true,
    },
    shirtNumber: {
      type: Number,
    },
    role: {
      type: String,
      enum: ["Player", "Coach", "Stuff"],
      default: "Player",
    },
    photo: {
      type: String,
      trim: true,
    },
    clubsPlayedWith: [
      {
        type: Schema.Types.ObjectId,
        ref: "Club",
      },
    ],
    clubs: {
      type: Schema.Types.ObjectId,
      ref: "Club",
    },
  },
  {
    timestamps: true,
  }
);

const Player = model("Player", playerSchema);

export default Player;
