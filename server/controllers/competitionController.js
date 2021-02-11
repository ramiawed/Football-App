import Competition from "../models/competitionModel.js";
import Season from "../models/seasonModel.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";

// GET ALL THE COMPETITIONS FROM DB
const getAllCompetitions = catchAsync(async (req, res, next) => {
  const competitions = await Competition.find();

  res.status(200).json({
    status: "success",
    data: {
      competitions,
    },
  });
});

// GET A COMPETITION SPECIFIED BY ID
const getCompetitionById = catchAsync(async (req, res, next) => {
  const competitionId = req.params.competitionId;

  if (!competitionId) {
    return next(new Error("Please enter a competition id"));
  }

  const competition = await Competition.findById(competitionId);

  if (!competition) {
    return next(new AppError("No competition found", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      competition,
    },
  });
});

// ADD A NEW COMPETITION
// NAME SHOULD BE UNIQUE AND REQUIRED
const addCompetition = catchAsync(async (req, res, next) => {
  const body = { ...req.body };
  const allowedField = [
    "name",
    "logo",
    "currentSeason",
    "numberOfAvailableSeasons",
    "color",
  ];
  Object.keys(body).forEach((key) => {
    if (allowedField.includes(key)) delete body[key];
  });
  const { name } = body;

  // NAME SHOULD BE REQUIRED
  if (!name) {
    return next(new AppError("A competition must have a name", 400));
  }

  // CREATE A NEW COMPETITION,
  // IF THE COMPETITION NAME IS ALREADY EXIST,
  // THROW A DUPLICATE ERROR
  const competition = await Competition.create(body);

  // SUCCESSFULLY CREATE A NEW COMPETITION
  res.status(201).json({
    status: "success",
    data: {
      competition,
    },
  });
});

// UPDATE AN EXISTING COMPETITION
const updateCompetition = catchAsync(async (req, res, next) => {
  const competitionId = req.params.competitionId;

  if (!competitionId) {
    return next(new Error("Please enter a competition id"));
  }

  const competition = await Competition.findByIdAndUpdate(
    competitionId,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!competition) {
    return next(new AppError("No competition found", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      competition,
    },
  });
});

// DELETE A COMPETITION SPECIFIED BY ID
const deleteCompetition = catchAsync(async (req, res, next) => {
  const competitionId = req.params.competitionId;

  if (!competitionId) {
    return next(new Error("Please enter a competition id"));
  }

  const competition = await Competition.findByIdAndDelete(competitionId);

  if (!competition) {
    return next(new AppError("No competition found", 404));
  }

  res.status(200).json({
    status: "success",
  });
});

const getCompetitionCurrentSeason = catchAsync(async (req, res, next) => {
  const competitionId = req.params.competitionId;

  if (!competitionId) {
    return new Error("Please enter a competition id");
  }

  const competition = await Competition.findById(competitionId);

  if (!competition) {
    return new Error("No such competition with this _id");
  }

  const currentSeason = await Season.findOne({
    code: competition.currentSeason,
    competition: competitionId,
  });

  res.status(200).json({
    status: "success",
    data: {
      currentSeason,
    },
  });
});

export {
  getAllCompetitions,
  getCompetitionById,
  getCompetitionCurrentSeason,
  addCompetition,
  deleteCompetition,
  updateCompetition,
};
