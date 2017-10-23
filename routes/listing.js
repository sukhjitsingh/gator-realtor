const express = require('express');
const router = express.Router();
const models = require('../models');

router.get('/listing', function (req, res, next) {
    res.render('listing');
});

router.post('/listing', function (req, res) {
    let address = req.body.inputAddress;
    let address2 = req.body.inputAddress2;
    let city = req.body.inputCity;
    let state = req.body.inputState;
    let zip = req.body.inputZip;
    let price = req.body.price;

    req.checkBody('inputAddress', 'Address is required').notEmpty();
    req.checkBody('inputCity', 'City is required').notEmpty();
    req.checkBody('inputState', 'State is required').notEmpty();
    req.checkBody('inputZip', 'Zip code is required').notEmpty();
    req.checkBody('price', 'Price is required').notEmpty();


    let errors = req.validationErrors();

    if (errors) {
        res.render('listing', {
            errors: errors
        });
    } else {
        var properties = new models.Properties({
            streetAddress: address + " " + address2,
            agentId: 1, // will need to fix this to grab the id of current agent based on login status
            city: city,
            state: state,
            zipcode: zip,
            price: price
        });
        req.flash('success_msg', 'Listing created successfully');
        res.redirect('listing');//should be agent dashbord
        properties.save((err) => {
            if (err) {
                return res.send(err);
            }
        });
    }
});

module.exports = router;
