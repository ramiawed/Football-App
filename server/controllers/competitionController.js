import Competition from "../models/competitionModel.js";
import Season from "../models/seasonModel.js";
import Club from "../models/clubModel.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";
import { filterFields } from "../utils/functions.js";

// ALL FIELDS FROM COMPETITION MODEL
const allowedFields = [
  "name",
  "logo",
  "currentSeason",
  "numberOfAvailableSeasons",
  "color",
];

// GET ALL THE COMPETITIONS FROM DB
export const getAllCompetitions = catchAsync(async (req, res, next) => {
  // FIND ALL THE COMPETITIONS
  const competitions = await Competition.find();

  // RETURN ALL COMPETITIONS
  res.status(200).json({
    status: "success",
    data: {
      competitions,
    },
  });
});

// GET A COMPETITION SPECIFIED BY ID
export const getCompetitionById = catchAsync(async (req, res, next) => {
  // GET THE COMPETITION ID FROM REQUEST PARAMETERS
  const competitionId = req.params.competitionId;

  //CHECK IF THE COMPETITION ID NOT NULL
  if (!competitionId) {
    return next(new AppError("Please enter a competition id"));
  }

  // FIND THE COMPETITION SPECIFIED BY ID
  // MONGOOSE WILL THROW A CAST ERROR IF THE COMPETITION ID IS NOT AN ObjectID
  const competition = await Competition.findById(competitionId);

  // IF THERE IS NO SUCH COMPETITION
  // THROW AN ERROR (NOT FOUND)
  if (!competition) {
    return next(new AppError("No competition found", 404));
  }

  // IF SUCCESS RETURN THE COMPETITION
  res.status(200).json({
    status: "success",
    data: {
      competition,
    },
  });
});

// GET A COMPETITION'S SEASONS SPECIFIED BY ID
export const getCompetitionSeason = catchAsync(async (req, res, next) => {
  // GET THE COMPETITION ID FROM REQUEST PARAMETERS
  const competitionId = req.params.competitionId;

  //CHECK IF THE COMPETITION ID NOT NULL
  if (!competitionId) {
    return next(new AppError("Please enter a competition id"));
  }

  // FIND THE COMPETITION SPECIFIED BY ID
  // MONGOOSE WILL THROW A CAST ERROR IF THE COMPETITION ID IS NOT AN ObjectID
  const competition = await Competition.findById(competitionId);

  // IF THERE IS NO SUCH COMPETITION
  // THROW AN ERROR (NOT FOUND)
  if (!competition) {
    return next(new AppError("No competition found", 404));
  }

  // IF SUCCESS RETURN THE COMPETITION
  res.status(200).json({
    status: "success",
    data: {
      seasons: competition.seasons,
    },
  });
});

// GET A COMPETITION'S CLUBS
export const getCompetitionClubs = catchAsync(async (req, res, next) => {
  // GET THE COMPETITION ID FROM REQUEST PARAMETERS
  const competitionId = req.params.competitionId;

  //CHECK IF THE COMPETITION ID NOT NULL
  if (!competitionId) {
    return next(new AppError("Please enter a competition id"));
  }

  // FIND THE COMPETITION'S CLUB SPECIFIED BY ID
  // MONGOOSE WILL THROW A CAST ERROR IF THE COMPETITION ID IS NOT AN ObjectID
  const clubs = await Club.find({ competition: competitionId });

  // IF THERE IS NO SUCH CLUBS
  // THROW AN ERROR (NOT FOUND)
  if (!clubs) {
    return next(new AppError("No clubs found", 404));
  }

  // IF SUCCESS RETURN THE COMPETITION
  res.status(200).json({
    status: "success",
    data: {
      clubs,
    },
  });
});

// ADD A NEW COMPETITION
// NAME SHOULD BE UNIQUE AND REQUIRED
export const addCompetition = catchAsync(async (req, res, next) => {
  const body = { ...req.body };

  // REMOVE ALL THE FIELDS THAT DOESN'T
  // BELONG TO COMPETITION MODEL
  // FOR SECURITY REASON
  filterFields(body, allowedFields);

  const { name } = body;

  // NAME IS REQUIRED
  if (!name) {
    return next(new AppError("A competition must have a name", 400));
  }

  // CREATE A NEW COMPETITION,
  // IF THE COMPETITION NAME IS ALREADY EXIST,
  // MONGOOSE WILL THROW A DUPLICATE ERROR
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
export const updateCompetition = catchAsync(async (req, res, next) => {
  // GET THE COMPETITION ID FROM REQUEST PARAMETERS
  const competitionId = req.params.competitionId;

  //CHECK IF THE COMPETITION ID NOT NULL
  if (!competitionId) {
    return next(new Error("Please enter a competition id"));
  }

  const body = { ...req.body };
  // REMOVE ALL THE FIELDS THAT DOESN'T
  // BELONG TO COMPETITION MODEL
  // FOR SECURITY REASON
  filterFields(body, allowedFields);

  // FIND THE COMPETITION BY ID AND IF IT ANY, UPDATE IT
  const competition = await Competition.findByIdAndUpdate(competitionId, body, {
    new: true,
    runValidators: true,
  });

  // IF THERE IS NO COMPETITION BY THAT ID
  // THROW AN ERROR
  if (!competition) {
    return next(new AppError("No competition found", 404));
  }

  // IF UPDATE SUCCESS,
  // RETURN THE UPDATED COMPETITION
  res.status(200).json({
    status: "success",
    data: {
      competition,
    },
  });
});

// DELETE A COMPETITION SPECIFIED BY ID
export const deleteCompetition = catchAsync(async (req, res, next) => {
  // GET THE COMPETITION ID FROM REQUEST PARAMETERS
  const competitionId = req.params.competitionId;

  //CHECK IF THE COMPETITION ID NOT NULL
  if (!competitionId) {
    return next(new AppError("Please enter a competition id"));
  }

  // FIND THE COMPETITION BY ID AND IF IT ANY, DELETE IT
  const competition = await Competition.findByIdAndDelete(competitionId);

  // IF THERE IS NO COMPETITION BY THAT ID
  // THROW AN ERROR
  if (!competition) {
    return next(new AppError("No competition found", 404));
  }

  // IF DELETE SUCCESS, RETURN NO CONTENT
  res.status(200).json({
    status: "success",
  });
});

// SET THE CURRENT SEASON FOR COMPETITION
export const setCurrentSeason = catchAsync(async (req, res, next) => {
  // GET THE COMPETITION ID FROM THE REQUEST PARAMETERS

  // GET THE SEASON ID FROM THE REQUEST PARAMETERS
  const { competitionId, seasonId } = req.params;

  if (!competitionId) {
    return next(new AppError("Please enter a competition id", 400));
  }

  if (!seasonId) {
    return next(new AppError("Please enter a season id", 400));
  }

  const competition = await Competition.findByIdAndUpdate(
    competitionId,
    { currentSeason: seasonId },
    { new: true, runValidators: true }
  );

  // IF THERE IS NO COMPETITION BY THAT ID
  // THROW AN ERROR
  if (!competition) {
    return next(new AppError("No competition found", 404));
  }

  // IF UPDATE SUCCESS,
  // RETURN THE UPDATED COMPETITION
  res.status(200).json({
    status: "success",
    data: {
      competition,
    },
  });
});

export const getCompetitionCurrentSeason = catchAsync(
  async (req, res, next) => {
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
  }
);
