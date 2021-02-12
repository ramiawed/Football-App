import Club from "../models/clubModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import { filterFields } from "../utils/functions.js";

const allowedFields = [
  "name",
  "shortName",
  "tla",
  "crestUrl",
  "address",
  "phone",
  "website",
  "email",
  "founded",
  "clubColors",
  "venue",
];

// GET ALL THE CLUBS FROM DB
export const getAllClubs = catchAsync(async (req, res, next) => {
  // FIND ALL THE CLUBS
  const clubs = await Club.find();

  // RETURN ALL CLUBS
  res.status(200).json({
    status: "success",
    data: {
      clubs,
    },
  });
});

// GET A CLUB SPECIFIED BY ID
export const getClubById = catchAsync(async (req, res, next) => {
  // GET THE CLUB ID FROM THE REQUEST PARAMETERS
  const clubId = req.params.clubId;

  // CHECK IF THE CLUB ID NOT NULL
  if (!clubId) {
    return next(new AppError("Please enter a club id"));
  }

  // FIND THE CLUB SPECIFIED BY ID
  // MONGOOSE WILL THROW A CAST ERROR IF THE CLUB ID IS NOT AN ObjectId
  const club = await Club.findById(clubId);

  // IF THERE IS NO SUCH CLUB
  // THROW AN ERROR (NOT FOUND)
  if (!club) {
    return next(new AppError("No club found", 404));
  }

  // IF SUCCESS, RETURN THE CLUB
  res.status(200).json({
    status: "success",
    data: {
      club,
    },
  });
});

// ADD A NEW CLUB
// NAME SHOULD BE UNIQUE AND REQUIRED
// EMAIL SHOULD BE VALID EMAIL
export const addClub = catchAsync(async (req, res, next) => {
  const body = { ...req.body };

  // REMOVE ALL THE FIELDS THAT DOESN'T
  // BELONG TO CLUB MODEL
  // FOR SECURITY REASON
  filterFields(body, allowedFields);

  const { name } = body;

  // NAME IS REQUIRED
  if (!name) {
    return next(new AppError("A club must have a name", 400));
  }

  // CREATE A NEW CLUB,
  // IF THE CLUB NAME IS ALREADY EXIST,
  // MONGOOSE WILL THROW A DUPLICATE ERROR,
  // IF EMAIL IS INVALID MONGOOSE WILL THROW VALIDATION ERROR
  const club = await Club.create(body);

  // SUCCESSFULLY CREATE A NEW CLUB
  res.status(201).json({
    status: "success",
    data: {
      club,
    },
  });
});

// UPDATE AN EXISTING CLUB
export const updateClub = catchAsync(async (req, res, next) => {
  // GET THE CLUB ID FROM REQUEST PARAMETERS
  const clubId = req.params.clubId;

  //CHECK IF THE CLUB ID NOT NULL
  if (!clubId) {
    return next(new Error("Please enter a club id"));
  }

  const body = { ...req.body };
  // REMOVE ALL THE FIELDS THAT DOESN'T
  // BELONG TO CLUB MODEL
  // FOR SECURITY REASON
  filterFields(body, allowedFields);

  // FIND THE CLUB BY ID AND IF IT ANY, UPDATE IT
  const club = await Club.findByIdAndUpdate(clubId, body, {
    new: true,
    runValidators: true,
  });

  // IF THERE IS NO CLUB BY THAT ID
  // THROW AN ERROR
  if (!club) {
    return next(new AppError("No club found", 404));
  }

  // IF UPDATE SUCCESS,
  // RETURN THE UPDATED CLUB
  res.status(200).json({
    status: "success",
    data: {
      club,
    },
  });
});

// DELETE A CLUB SPECIFIED BY ID
export const deleteClub = catchAsync(async (req, res, next) => {
  // GET THE CLUB ID FROM REQUEST PARAMETERS
  const clubId = req.params.clubId;

  //CHECK IF THE CLUB ID NOT NULL
  if (!clubId) {
    return next(new Error("Please enter a club id"));
  }

  // FIND THE CLUB BY ID AND IF IT ANY, DELETE IT
  const club = await Club.findByIdAndDelete(clubId);

  // IF THERE IS NO CLUB BY THAT ID
  // THROW AN ERROR
  if (!club) {
    return next(new AppError("No club found", 404));
  }

  // IF DELETE SUCCESS, RETURN NO CONTENT
  res.status(200).json({
    status: "success",
  });
});
