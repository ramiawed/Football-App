import { Router } from 'express';
import { getAllLeagues } from '../controllers/leagueController.js';

const LeagueRouter = Router();

LeagueRouter.get('/', getAllLeagues);

export default LeagueRouter;