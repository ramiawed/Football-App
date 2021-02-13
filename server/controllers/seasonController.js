import Season from "../models/seasonModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import { filterFields } from "../utils/functions.js";

const allowedFields = [
  "code",
  "startDate",
  "endDate",
  "currentMatchday",
  "winner",
  "competition",
  "clubs",
];

// GET ALL THE SEASONS FROM DB
export const getAllSeasons = catchAsync(async (req, res, next) => {
  // FIND ALL THE SEASONS
  const seasons = await Season.find();

  // RETURN ALL SEASONS
  res.status(200).json({
    status: "success",
    data: {
      seasons,
    },
  });
});

// GET A SEASON SPECIFIED BY ID
export const getSeasonById = catchAsync(async (req, res, next) => {
  // GET THE SEASON ID FROM THE REQUEST PARAMETERS
  const seasonId = req.params.seasonId;

  // CHECK IF THE SEASON ID NOT NULL
  if (!seasonId) {
    return next(new AppError("Please enter a season id"));
  }

  // FIND THE SEASON SPECIFIED BY ID
  // MONGOOSE WILL THROW A CAST ERROR IF THE SEASON ID IS NOT AN ObjectId
  const season = await Season.findById(seasonId);

  // IF THERE IS NO SUCH SEASON
  // THROW AN ERROR (NOT FOUND)
  if (!season) {
    return next(new AppError("No season found", 404));
  }

  // IF SUCCESS, RETURN THE SEASON
  res.status(200).json({
    status: "success",
    data: {
      season,
    },
  });
});

// ADD A NEW SEASON
// NAME SHOULD BE UNIQUE AND REQUIRED
// EMAIL SHOULD BE VALID EMAIL
export const addSeason = catchAsync(async (req, res, next) => {
  const body = { ...req.body };

  // REMOVE ALL THE FIELDS THAT DOESN'T
  // BELONG TO SEASON MODEL
  // FOR SECURITY REASON
  filterFields(body, allowedFields);

  const { name } = body;

  // NAME IS REQUIRED
  if (!name) {
    return next(new AppError("A season must have a name", 400));
  }

  // CREATE A NEW SEASON,
  // IF THE SEASON NAME IS ALREADY EXIST,
  // MONGOOSE WILL THROW A DUPLICATE ERROR,
  // IF EMAIL IS INVALID MONGOOSE WILL THROW VALIDATION ERROR
  const season = await Season.create(body);

  // SUCCESSFULLY CREATE A NEW SEASON
  res.status(201).json({
    status: "success",
    data: {
      season,
    },
  });
});

// UPDATE AN EXISTING SEASON
export const updateSeason = catchAsync(async (req, res, next) => {
  // GET THE SEASON ID FROM REQUEST PARAMETERS
  const seasonId = req.params.seasonId;

  //CHECK IF THE SEASON ID NOT NULL
  if (!seasonId) {
    return next(new Error("Please enter a season id"));
  }

  const body = { ...req.body };
  // REMOVE ALL THE FIELDS THAT DOESN'T
  // BELONG TO SEASON MODEL
  // FOR SECURITY REASON
  filterFields(body, allowedFields);

  // FIND THE SEASON BY ID AND IF IT ANY, UPDATE IT
  const season = await Season.findByIdAndUpdate(seasonId, body, {
    new: true,
    runValidators: true,
  });

  // IF THERE IS NO SEASON BY THAT ID
  // THROW AN ERROR
  if (!season) {
    return next(new AppError("No season found", 404));
  }

  // IF UPDATE SUCCESS,
  // RETURN THE UPDATED SEASON
  res.status(200).json({
    status: "success",
    data: {
      season,
    },
  });
});

// DELETE A SEASON SPECIFIED BY ID
export const deleteSeason = catchAsync(async (req, res, next) => {
  // GET THE SEASON ID FROM REQUEST PARAMETERS
  const seasonId = req.params.seasonId;

  //CHECK IF THE SEASON ID NOT NULL
  if (!seasonId) {
    return next(new Error("Please enter a season id"));
  }

  // FIND THE SEASON BY ID AND IF IT ANY, DELETE IT
  const season = await Season.findByIdAndDelete(seasonId);

  // IF THERE IS NO SEASON BY THAT ID
  // THROW AN ERROR
  if (!season) {
    return next(new AppError("No season found", 404));
  }

  // IF DELETE SUCCESS, RETURN NO CONTENT
  res.status(200).json({
    status: "success",
  });
});
