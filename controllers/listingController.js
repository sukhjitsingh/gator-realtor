const models = require('../models');
const queriesController = require('../controllers/queriesController');

module.exports.createListing = (req, res) => {
    let address = req.body.streetAddress;
    let address2 = req.body.streetAddress2;
    let city = req.body.city;
    let state = req.body.state;
    let zip = req.body.zipcode;
    let price = req.body.price;
    let buildYear = req.body.buildYear;
    let bath = req.body.bathroomNumber;
    let bed = req.body.bedroomNumber;
    let type = req.body.typeOfHome;
    let size = req.body.lotSize;
    let parking = req.body.parking;


    req.checkBody('streetAddress', 'Address is required').notEmpty();
    req.checkBody('city', 'City is required').notEmpty();
    req.checkBody('state', 'State is required').notEmpty();
    req.checkBody('zipcode', 'Zip code is required').notEmpty();
    req.checkBody('buildYear', 'Build year is required').notEmpty();
    req.checkBody('price', 'Price is required').notEmpty();
    req.checkBody('bathroomNumber', 'Number of bathrooms is required').notEmpty();
    req.checkBody('bedroomNumber', 'Number of bedrooms is required').notEmpty();
    req.checkBody('typeOfHome', 'Property type is required').notEmpty();
    req.checkBody('lotSize', 'Lot Size is required').notEmpty();


    let errors = req.validationErrors();
    if (errors) {
        res.render('listing', {
            errors: errors
        });
    } else {
        let agentid = req.user.dataValues.agentId;
        //console.log(agentid)
        queriesController.updatePropertyValue(agentid)
            .then(() => {
                let properties = new models.Properties({
                    streetAddress: address,
                    streetAddress2: address2,
                    city: city,
                    state: state,
                    agentId: agentid,
                    zipcode: zip,
                    price: price,
                    buildYear: buildYear,
                    bedrooms: bed,
                    bathrooms: bath,
                    lotSize: size,
                    type: type,
                    parking: parking,
                    isSet: 0
                });
                res.render('imagePage');
                properties.save((err) => {
                    if (err) {
                        return res.send(err);
                    }
                });
            })
            .catch((err) => {
                return res.send(err);
            });
    }
};

module.exports.cancelCreation = (req, res) => {

    queriesController.getAgentId(req.user.id)
        .then(agentid => {
            console.log('AGENT ID getAgentId: ', agentid[0].agentId)
            queriesController.getUnsetPropertyId(agentid[0].agentId)
                .then(result => {
                    console.log(result[0].id);
                    queriesController.deleteProperty(result[0].id)
                        .then(() => {
                            res.redirect('/dashboard')
                        })
                        .catch((err) => {
                            return res.send(err);
                        });
                }
                )
                .catch((err) => {
                    return res.send(err);
                });

        })
};

module.exports.finishCreate = (req, res) => {
    queriesController.updatePropertyValue(req.user.dataValues.agentId)
        .then(() => {
            req.flash('success_msg', 'Listing was created successfully');
            res.redirect('/dashboard');
        })
        .catch((err) => {
            return res.send(err);
        });
};