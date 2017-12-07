const queriesController = require('../controllers/queriesController');
const models = require('../models');


const displayListing = (request, response, next) => {

    const {id} = request.params;
    queriesController.getProperty(id)
        .then(foundProperty => {

            if (foundProperty.length !== 0) {
                Promise.all([
                    queriesController.getAgent(id),
                    queriesController.getProperty(id),
                    queriesController.getImages(id)
                ])
                    .then(([agent, property, images]) => {
                        response.render('listingdetails', {agent: agent[0], property: property[0], images: images})
                    }).catch((err) => {
                    return response.send(err);
                });
            } else {
                response.redirect('/');
            }
        });
};

const saveMessage = (request, response, next) => {

    queriesController.getAgent(request.body.sendMessage).then(agentId => {
        let message = new models.buyerMessages({
            buyerFullName: request.body.name,
            buyerEmail: request.body.email,
            buyerPhoneNumber: request.body.phoneNumber,
            message: request.body.message,
            agentId: agentId[0].agentId,
            listingNumber: request.body.sendMessage
        });
        message.save((err) => {
            if (err) {
                return response.send(err);
            }
        });
        response.sendStatus(304);

    }).catch((err) => {
        return response.send(err);
    });
};

module.exports = {
    displayListing,
    saveMessage
};