const queriesController = require('../controllers/queriesController');
const models = require('../models');


const displayListing = (request, response, next) => {

    Promise.all([
        queriesController.getAgent(request.body.listingdetailbutton),
        queriesController.getProperty(request.body.listingdetailbutton)
    ])
        .then(([agent, property]) => {
            response.render('listingdetails', {agent: agent[0], property: property[0]})
        }).catch((err) => {
        return response.send(err);
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
        request.flash('success_msg', 'Listing created successfully');
        message.save((err) => {
            if (err) {
                return response.send(err);
            }
        });
    }).catch((err) => {
        return response.send(err);
    });
};

module.exports = {
    displayListing,
    saveMessage
};