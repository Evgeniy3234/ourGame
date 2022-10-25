/* eslint-disable max-len */
const route = require('express').Router();
const sha256 = require('sha256');
const { User } = require('../db/models');

route.post('/auth/signup', async (req, res) => {
  const { name, email, password } = req.body;
  const userCheck = await User.findOne({ where: { email }, raw: true });
  if (userCheck) {
    res.send('Такой пользователь уже есть');
  } else {
    const user = await User.create({ name, email, password: sha256(password) });
    // console.log('user.username from signup', user.username);
    // записываем в базу, если успешно - от юзеры из базы отправляем name на front
    req.session.email = user.email;
    req.session.userid = user.id;
    res.json({ name: user.name, id: user.id });
  }
});
route.post('/auth/signin', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email }, raw: true });

  if (user) {
    if (sha256(password) === user.password) {
      req.session.email = user.email;
      req.session.userid = user.id;
      res.json({ name: user.name, id: user.id });
    } else {
      return res.send('wrong password');
    }
  } else {
    return res.send('wrong email');
  }
});
route.get('/auth/signout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return console.log(err);
    }
    res.sendStatus(200);
  });
  res.clearCookie('connect.sid');
});

route.get('/check', async (req, res) => {
  if (req.session.userid) {
    const user = await User.findByPk(req.session.userid);
    res.json({ name: user.name, id: user.id });
  } else {
    res.end();
  }
});

module.exports = route;
