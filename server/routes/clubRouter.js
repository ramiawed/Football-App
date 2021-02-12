import express from "express";
import {
  addClub,
  deleteClub,
  getAllClubs,
  getClubById,
  updateClub,
} from "../controllers/clubController.js";

const clubRouter = express.Router();

// GET ALL THE CLUBS OR ADD A NEW ONE
clubRouter.route("/").get(getAllClubs).post(addClub);

// GET, UPDATE, DELETE THE CLUB SPECIFIED BY ID
clubRouter
  .route("/:clubId")
  .get(getClubById)
  .patch(updateClub)
  .delete(deleteClub);

export default clubRouter;
