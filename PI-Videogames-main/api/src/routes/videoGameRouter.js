const { Router } = require('express');

const { getGamesHandler } = require('../handlers/videoGameHandler');
const { getGameById } = require('../handlers/videoGameIdHandler');
const { createGameHandler } = require('../handlers/createGameHandler');

const videoGameRouter = Router();

videoGameRouter.get('/', getGamesHandler);
videoGameRouter.get('/:id', getGameById);
videoGameRouter.post('/', createGameHandler);

module.exports = videoGameRouter;