const queriesController = require('../controllers/queriesController');

module.exports.displayDashboardProperties = (request, response) => {

    Promise.all([
        queriesController.dashboardMessages(request.user.id),
        queriesController.dashboardProperties(request.user.id),
        queriesController.getUser(request.user.id)
    ])
        .then(([messages, properties, user]) => {

            const propertyMap = properties.reduce((memo, property) =>
                Object.assign({}, memo, {[property.id]: property}), {});

            const result = messages.map(message =>
                Object.assign({}, message, {property: propertyMap[message.listingNumber]}));

            if (request.body.pdate) {
                properties.sort((a, b) => {
                    return (a.createdAt - b.createdAt)
                })
            }
            if (request.body.mdate) {
                result.sort((a, b) => {
                    return (a.createdAt - b.createdAt)
                })
            }
            response.render('dashboard', {result: result, user: user[0], properties})
        })
        .catch((err) => {
            return response.send(err);
        });
};

module.exports.deleteProperty = (request, response) => {
    queriesController.deleteProperty(request.body.deleteButton)
        .then(results => {
            request.flash('success_msg', 'Property has been deleted successfully.');
            response.redirect('/dashboard');
        }).catch((err) => {
        return response.send(err);
    });
};