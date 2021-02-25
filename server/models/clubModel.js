import mongoose from "mongoose";
import validator from "validator";

const { Schema, model } = mongoose;

var clubSchema = new Schema(
  {
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
      trim: true,
      index: {
        unique: true,
        sparse: true,
      },
      // validate: [validator.isEmail, "Please provide a valid email"],
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
    active: {
      type: Boolean,
      default: true,
    },
    seasons: [
      {
        type: Schema.Types.ObjectId,
        // required: true,
        ref: "Season",
      },
    ],
    competition: {
      type: Schema.Types.ObjectId,
      ref: "Competition",
    },
  },
  {
    timestamps: true,
  }
);

// MIDDLEQUERY

//
clubSchema.pre("save", function (next) {
  if (this.isNew) {
    // SET THE shortName as name
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

clubSchema.pre(/^find/, function (next) {
  this.find({ active: { $eq: true } });

  next();
});

// POPULATE THE COMPETITION FIELD
clubSchema.pre(/^find/, function (next) {
  this.populate({
    path: "competition",
  });

  next();
});

const Club = model("Club", clubSchema);

export default Club;
