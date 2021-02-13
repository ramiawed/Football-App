import express from "express";
import {
  addPlayer,
  deletePlayer,
  getAllPlayers,
  getPlayerById,
  updatePlayer,
} from "../controllers/playerController.js";

const playerRouter = express.Router();

// GET ALL THE PLAYERS OR ADD A NEW ONE
playerRouter.route("/").get(getAllPlayers).post(addPlayer);

// GET, UPDATE, DELETE THE PLAYER SPECIFIED BY ID
playerRouter
  .route("/:playerId")
  .get(getPlayerById)
  .patch(updatePlayer)
  .delete(deletePlayer);

export default playerRouter;
