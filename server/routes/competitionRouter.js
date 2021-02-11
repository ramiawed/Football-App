import { Router } from "express";
import {
  getAllCompetitions,
  getCompetitionById,
  getCompetitionCurrentSeason,
  addCompetition,
  deleteCompetition,
  updateCompetition,
} from "../controllers/competitionController.js";

const CompetitionRouter = Router();

// GET ALL THE COMPETITIONS OR ADD A NEW ONE
CompetitionRouter.route("/").get(getAllCompetitions).post(addCompetition);

// GET THE COMPETITION SPECIFIED BY ID OR DELETE IT
CompetitionRouter.route("/:competitionId")
  .get(getCompetitionById)
  .patch(updateCompetition)
  .delete(deleteCompetition);

// GET THE CURRENT SEASON FOR A SPECIFIC COMPETITION
CompetitionRouter.get(
  "/:competitionId/currentSeason",
  getCompetitionCurrentSeason
);

export default CompetitionRouter;
