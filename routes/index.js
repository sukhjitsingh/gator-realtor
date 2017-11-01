const express = require('express');
const bodyParser = require('body-parser');
const models = require('../models');
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const router = express.Router();

const urlencodedParser = bodyParser.urlencoded({ extended: false });

/* GET home page. */
router.get('/', function(request, response, next) {
  response.render('index', {title: 'Gator Realtor'})
});

/* POST Listing page. */
router.get('/agent', function(request, response, next) {
  response.render('agent', {title: 'Agent Dashboard'})
});

router.get('/test', function(request, response, next) {
    response.render('test', {
        title: 'Test'
    })
});

router.post('/agent',urlencodedParser, upload.single('avatar'), function (req, res, next) {
  if (!req.body) return res.sendStatus(400)
  let streetAddress = req.body.streetAddress;
  let city = req.body.city;
  let state = req.body.state;
  let zipcode = req.body.zipcode;
  let price = req.body.price;

  req.checkBody('streetAddress', 'address is required').notEmpty();
  req.checkBody('city', ' city is required').notEmpty();
  req.checkBody('state', 'state is required').notEmpty();
  req.checkBody('zipcode', 'zipcode is required').notEmpty().isLength(3,5);
  req.checkBody('price', 'price is required').notEmpty();

  let errors = req.validationErrors();

  if(errors){
      res.render('agent', {
          errors:errors
      });
  }else {
      var property = new models.Properties({
          streetAddress: streetAddress,
          city: city,
          state: state,
          zipcode: zipcode,
          price: price,
          agentId: 1,
      });
      req.flash('success_msg', 'Listing uploaded');
      res.redirect('agent');

      property.save((err) => {
          if (err) {
              return res.send(err);
          }
      });
  }
});

module.exports = router;
