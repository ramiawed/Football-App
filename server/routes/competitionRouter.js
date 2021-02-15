import { Router } from "express";
import {
  getAllCompetitions,
  getCompetitionById,
  getCompetitionCurrentSeason,
  addCompetition,
  deleteCompetition,
  updateCompetition,
  getCompetitionSeason,
  getCompetitionClubs,
} from "../controllers/competitionController.js";

const CompetitionRouter = Router();

// GET ALL THE COMPETITIONS OR ADD A NEW ONE
CompetitionRouter.route("/").get(getAllCompetitions).post(addCompetition);

// GET, DELETE, UPDATE THE COMPETITION SPECIFIED BY ID
CompetitionRouter.route("/:competitionId")
  .get(getCompetitionById)
  .patch(updateCompetition)
  .delete(deleteCompetition);

// UPDATE THE CURRENT SEASON FOR A SPECIFIC COMPETITION
CompetitionRouter.patch("/:competitionId/season/:seasonId");

// GET ALL THE COMPETITION'S SEASONS
CompetitionRouter.route("/:competitionId/seasons").get(getCompetitionSeason);
CompetitionRouter.route("/:competitionId/clubs").get(getCompetitionClubs);

// GET THE CURRENT SEASON FOR A SPECIFIC COMPETITION
CompetitionRouter.get(
  "/:competitionId/currentSeason",
  getCompetitionCurrentSeason
);

export default CompetitionRouter;
