import { Router } from "express";
import {
  getAllTeamByLeague,
  getTeamById,
} from "../controllers/teamController.js";

const TeamRouter = Router();

TeamRouter.get("/:leagueId", getAllTeamByLeague);
TeamRouter.get("/team/:teamId", getTeamById);

export default TeamRouter;
