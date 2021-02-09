import League from '../models/leagueModel.js';

export async function getAllLeagues(req, res, next) {
    const leagues = await League.find();

    res.status(200).json({
        status: 'success',
        data: {
            leagues
        }
    })
}