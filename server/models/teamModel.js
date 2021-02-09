import mongoose from "mongoose";
const { Schema, model } = mongoose;

const teamSchema = new Schema({
  name: {
    type: String,
    required: [true, "A team must have a name"],
  },
  league: {
    type: Schema.ObjectId,
    ref: "League",
    required: [true, "Team must belong to a league"],
  },
});

const Team = model("Team", teamSchema);

export default Team;
