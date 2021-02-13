import Player from "../models/playerModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import { filterFields } from "../utils/functions.js";

const allowedFields = [
  "name",
  "position",
  "dateOfBirth",
  "countryOfBirth",
  "nationality",
  "shirtNumber",
  "role",
  "photo",
];

// GET ALL THE PLAYERS FROM DB
export const getAllPlayers = catchAsync(async (req, res, next) => {
  // FIND ALL THE PLAYERS
  const players = await Player.find();

  // RETURN ALL PLAYERS
  res.status(200).json({
    status: "success",
    data: {
      players,
    },
  });
});

// GET A PLAYER SPECIFIED BY ID
export const getPlayerById = catchAsync(async (req, res, next) => {
  // GET THE PLAYER ID FROM THE REQUEST PARAMETERS
  const playerId = req.params.playerId;

  // CHECK IF THE PLAYER ID NOT NULL
  if (!playerId) {
    return next(new AppError("Please enter a player id"));
  }

  // FIND THE PLAYER SPECIFIED BY ID
  // MONGOOSE WILL THROW A CAST ERROR IF THE PLAYER ID IS NOT AN ObjectId
  const player = await Player.findById(playerId);

  // IF THERE IS NO SUCH PLAYER
  // THROW AN ERROR (NOT FOUND)
  if (!player) {
    return next(new AppError("No player found", 404));
  }

  // IF SUCCESS, RETURN THE PLAYER
  res.status(200).json({
    status: "success",
    data: {
      player,
    },
  });
});

// ADD A NEW PLAYER
// NAME SHOULD BE UNIQUE AND REQUIRED
// EMAIL SHOULD BE VALID EMAIL
export const addPlayer = catchAsync(async (req, res, next) => {
  const body = { ...req.body };

  // REMOVE ALL THE FIELDS THAT DOESN'T
  // BELONG TO PLAYER MODEL
  // FOR SECURITY REASON
  filterFields(body, allowedFields);

  const { name } = body;

  // NAME IS REQUIRED
  if (!name) {
    return next(new AppError("A player must have a name", 400));
  }

  // CREATE A NEW PLAYER,
  // IF THE PLAYER NAME IS ALREADY EXIST,
  // MONGOOSE WILL THROW A DUPLICATE ERROR,
  // IF EMAIL IS INVALID MONGOOSE WILL THROW VALIDATION ERROR
  const player = await Player.create(body);

  // SUCCESSFULLY CREATE A NEW PLAYER
  res.status(201).json({
    status: "success",
    data: {
      player,
    },
  });
});

// UPDATE AN EXISTING PLAYER
export const updatePlayer = catchAsync(async (req, res, next) => {
  // GET THE PLAYER ID FROM REQUEST PARAMETERS
  const playerId = req.params.playerId;

  //CHECK IF THE PLAYER ID NOT NULL
  if (!playerId) {
    return next(new Error("Please enter a player id"));
  }

  const body = { ...req.body };
  // REMOVE ALL THE FIELDS THAT DOESN'T
  // BELONG TO PLAYER MODEL
  // FOR SECURITY REASON
  filterFields(body, allowedFields);

  // FIND THE PLAYER BY ID AND IF IT ANY, UPDATE IT
  const player = await Player.findByIdAndUpdate(playerId, body, {
    new: true,
    runValidators: true,
  });

  // IF THERE IS NO PLAYER BY THAT ID
  // THROW AN ERROR
  if (!player) {
    return next(new AppError("No player found", 404));
  }

  // IF UPDATE SUCCESS,
  // RETURN THE UPDATED PLAYER
  res.status(200).json({
    status: "success",
    data: {
      player,
    },
  });
});

// DELETE A PLAYER SPECIFIED BY ID
export const deletePlayer = catchAsync(async (req, res, next) => {
  // GET THE PLAYER ID FROM REQUEST PARAMETERS
  const playerId = req.params.playerId;

  //CHECK IF THE PLAYER ID NOT NULL
  if (!playerId) {
    return next(new Error("Please enter a player id"));
  }

  // FIND THE PLAYER BY ID AND IF IT ANY, DELETE IT
  const player = await Player.findByIdAndDelete(playerId);

  // IF THERE IS NO PLAYER BY THAT ID
  // THROW AN ERROR
  if (!player) {
    return next(new AppError("No player found", 404));
  }

  // IF DELETE SUCCESS, RETURN NO CONTENT
  res.status(200).json({
    status: "success",
  });
});
