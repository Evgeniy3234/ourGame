const route = require('express').Router();

const { User, Question, Game } = require('../db/models');

route.get('/', async (req, res) => {
  const quest = await Question.findAll({ raw: true });
  res.json(quest);
});

route.post('/', async (req, res) => {
  // console.log('req.body from game', req.body);
  const { id } = req.body;
  const newGame = await Game.create({ user_id: id });
  // console.log('newGameJson', newGame.toJSON());
  const newGameJson = newGame.toJSON();
  res.json({ newGameJson });
});

route.post('/check', async (req, res) => {
  // console.log('req.body from check',req.body);
  const { answer, el, game } = req.body;
  const checkQues = await Question.findOne({ raw: true, where: { id: el.id } });
  // console.log('game', game);
  // console.log('answer from req.body', answer);
  // console.log('answer from checkQues', checkQues.answer);
  if (answer.answer.toLowerCase() === checkQues.answer.toLowerCase()) {
    // console.log('ответ правильный');
    const ourGame = await Game?.findOne({ where: { id: game.id } });
    // console.log(ourGame.total);
    const updTotal = ourGame.total + el.value;
    // console.log('updTotal===', updTotal);
    await Game.update({ total: updTotal }, { where: { id: game.id } });
    res.json('правильно');
  } else {
    console.log('ответ НЕВЕРНЫЙ');
    res.json('неверно');
  }
  res.end();
});

module.exports = route;
