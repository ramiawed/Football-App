import AppError from "../utils/appError.js";
import Team from "../models/teamModel.js";
import catchAsync from "../utils/catchAsync.js";

// get all teams for a specific league
const getAllTeamByLeague = catchAsync(async (req, res, next) => {
  const leagueId = req.params.leagueId;

  if (leagueId == null) {
    return next(new AppError("Please select a league"));
  }

  const teams = await Team.find({ league: leagueId });

  if (teams.length === 0) {
    return next(new AppError("Please select a league"));
  }

  res.status(200).json({
    status: "success",
    data: {
      teams,
    },
  });
});

// get team by id
const getTeamById = catchAsync(async (req, res, next) => {
  const teamId = req.params.teamId;

  if (teamId == null) {
    return next(new AppError("Please select a team"));
  }

  const team = await Team.findById(teamId);

  if (team == null) {
    return next(new AppError(`No such team with this ${teamId}`));
  }

  res.status(200).json({
    status: "success",
    data: {
      team,
    },
  });
});

export { getAllTeamByLeague, getTeamById };
