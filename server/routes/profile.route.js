const route = require('express').Router();
const { Game } = require('../db/models');

route.post('/:id', async (req, res) => {
  const { userid } = req.session;
  try {
    const games = await Game.findAll({ where: { user_id: userid } });
    res.json({ games });
  } catch (error) {
    console.error('error in profile router ', error);
  }
});

module.exports = route;
