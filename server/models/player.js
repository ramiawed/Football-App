import mongoose from "mongoose";
const { Schema, model } = mongoose;

const playerSchema = new Schema({
  name: {
    type: String,
    required: [true, "A player must have a name"],
    maxlength: [50, "A player name must be less than 50 characters"],
    trim: true,
  },
  tShirtNumber: {
    type: Number,
    required: [true, "A player must have a t-shirt number"],
    min: 1,
    max: 99,
  },
  nationality: {
    type: String,
    trim: true,
    default: "unknown",
  },
  born: {
    type: Date,
  },
  photo: {
    type: String,
  },
  teamId: {
    type: Schema.ObjectId,
    ref: "Team",
    required: [true, "Player must belong to a team"],
  },
  position: {
    type: String,
    enum: [
      "GK",
      "AM",
      "AMC",
      "AMF",
      "AMR",
      "AML",
      "CAM",
      "CB",
      "CDM",
      "CF",
      "CH",
      "CM",
      "CMF",
      "DM",
      "GK",
      "LB",
      "LCB",
      "LF",
      "LH",
      "LM",
      "LS",
      "LW",
      "LWB",
      "M",
      "OB",
      "RB",
      "RCB",
      "RF",
      "RM",
      "RS",
      "RW",
      "RWB",
      "SS",
      "ST",
      "SW",
      "WF",
      "WB",
      "PL",
    ],
    default: "PL",
  },
});

const Player = model("Player", playerSchema);

export default Player;
