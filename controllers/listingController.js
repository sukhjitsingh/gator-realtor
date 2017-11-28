const models = require('../models');
const queriesController = require('../controllers/queriesController');

module.exports.createListing = (req, res) => {
    let address = req.body.streetAddress;
    let address2 = req.body.streetAddress2;
    let city = req.body.city;
    let state = req.body.state;
    let zip = req.body.zipcode;
    let price = parseFloat(req.body.price).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    let buildYear = req.body.buildYear;
    let bath = req.body.bathroomNumber;
    let bed = req.body.bedroomNumber;

    req.checkBody('streetAddress', 'Address is required').notEmpty();
    req.checkBody('city', 'City is required').notEmpty();
    req.checkBody('state', 'State is required').notEmpty();
    req.checkBody('zipcode', 'Zip code is required').notEmpty();
    req.checkBody('buildYear', 'Build year is required').notEmpty();
    req.checkBody('price', 'Price is required').notEmpty();
    req.checkBody('bathroomNumber', 'Number of bathrooms is required').notEmpty();
    req.checkBody('bedroomNumber', 'Number of bedrooms is required').notEmpty();

    let errors = req.validationErrors();
    if (errors) {
        res.render('listing', {
            errors: errors
        });
    } else {
        queriesController.getAgentId(req.user.id).then(agentId => {
            let properties = new models.Properties({
                streetAddress: address,
                streetAddress2: address2,
                city: city,
                state: state,
                agentId: agentId[0].agentId,
                zipcode: zip,
                price: price,
                buildYear: buildYear,
                bedrooms: bed,
                bathrooms: bath
            });
            res.render('imagePage');
            properties.save((err) => {
                if (err) {
                    return res.send(err);
                }
            });
        }).catch((err) => {
            return response.send(err);
        });
    }
};