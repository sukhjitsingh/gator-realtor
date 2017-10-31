const models = require('../models');

module.exports.createListing = function (req, res) {
    let address = req.body.streetAddress;
    let address2 = req.body.streetAddress2;
    let city = req.body.city;
    let state = req.body.state;
    let zip = req.body.zipcode;
    let price = req.body.price;
    let builtYear = req.body.builtYear;
    let bath = req.body.bathroomNumber;
    let bed = req.body.bedroomNumber;

    req.checkBody('streetAddress', 'Address is required').notEmpty();
    req.checkBody('city', 'City is required').notEmpty();
    req.checkBody('state', 'State is required').notEmpty();
    req.checkBody('zipcode', 'Zip code is required').notEmpty();
    req.checkBody('builtYear', 'Build year is required').notEmpty();
    req.checkBody('price', 'Price is required').notEmpty();
    req.checkBody('bathroomNumber', 'Number of bathrooms is required').notEmpty();
    req.checkBody('bedroomNumber', 'Number of bedrooms is required').notEmpty();

    let errors = req.validationErrors();

    if (errors) {
        res.render('listing', {
            errors: errors
        });
    } else {
        let properties = new models.Properties({
            streetAddress: address,
            streetAddress2: address2,
            agentId: 1, // will need to fix this to grab the id of current agent based on login status
            city: city,
            state: state,
            zipcode: zip,
            price: price,
            buildYear: builtYear,
            bedrooms: bed,
            bathrooms: bath
        });
        req.flash('success_msg', 'Listing created successfully');
        res.redirect('listing');//should be agent dashbord
        properties.save((err) => {
            if (err) {
                return res.send(err);
            }
        });
    }
};