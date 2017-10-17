const express = require('express');
const models = require('../models')
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// Register
router.get('/register', function(req, res){
  res.render('register');
});


// Working in progess will be moving this in the near future.
router.post('/register', function (req, res) {
  let user = new models.User ({
    id: req.body.id,
    userName: req.body.username,
    email: req.body.email,
    password: req.body.password
  })

  user.save((err) => {
  if (err) {
      return res.send(err);
  }

  models.User
    .find()
    .then((data) => {
        res.render('register', { title: 'List', data: data });
    })
    .catch((err) => {
        return res.send(err);
    });
  });
})

// Login
router.get('/login', function(req, res){
  res.render('login');
});

module.exports = router;
