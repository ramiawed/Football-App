import mongoose from "mongoose";
import validator from "validator";

const { Schema, model } = mongoose;

var clubSchema = new Schema({
  name: {
    type: String,
    required: [true, "A team must have a name"],
    unique: [true, "A team's name must be a unique"],
    maxLength: 50,
    trim: true,
  },
  shortName: {
    type: String,
    trim: true,
  },
  tla: {
    type: String,
    trim: true,
  },
  crestUrl: {
    type: String,
    trim: true,
  },
  address: {
    type: String,
    trim: true,
  },
  phone: {
    type: String,
    trim: true,
  },
  website: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    unique: [true, "A team must have a unique email"],
    trim: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  founded: {
    type: Number,
  },
  clubColors: {
    type: String,
    trim: true,
  },
  venue: {
    type: String,
    trim: true,
  },
  // seasons: [{ type: Schema.Types.ObjectId, required: true, ref: "seasons" }],
});

clubSchema.pre("save", function (next) {
  if (this.isNew) {
    if (!this.shortName) this.shortName = this.name;

    if (!this.tla) {
      let shortTla = "";
      const splitName = this.name.split(" ");
      splitName.forEach((element) => {
        shortTla = shortTla + element.charAt(0);
      });
      this.tla = shortTla.toUpperCase();
    }
  }
  next();
});

const Club = model("Club", clubSchema);

export default Club;
