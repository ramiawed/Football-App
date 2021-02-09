import mongoose from "mongoose";
const { Schema, model } = mongoose;

const leagueSchema = new Schema({
  name: {
    type: String,
    required: [true, "A league must have name"],
    unique: [true, "A league name must be unique"],
  },
  color: {
    type: String,
    default: "rgb(255, 0, 0)",
  },
  logo: {
    type: String,
    required: [true, "A league must have a logo"],
  },
});

const League = model("League", leagueSchema);

export default League;
