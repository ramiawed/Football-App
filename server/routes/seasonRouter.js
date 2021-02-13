import express from "express";
import {
  addSeason,
  deleteSeason,
  getAllSeasons,
  getSeasonById,
  updateSeason,
} from "../controllers/seasonController.js";

const seasonRouter = express.Router();

// GET ALL THE SEASONS OR ADD A NEW ONE
seasonRouter.route("/").get(getAllSeasons).post(addSeason);

// GET, UPDATE, DELETE THE SEASON SPECIFIED BY ID
seasonRouter
  .route("/:seasonId")
  .get(getSeasonById)
  .patch(updateSeason)
  .delete(deleteSeason);

export default seasonRouter;
