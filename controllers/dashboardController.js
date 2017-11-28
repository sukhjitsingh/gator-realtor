const queriesController = require('../controllers/queriesController');

module.exports.displayDashboardProperties = (request, response) => {

    Promise.all([
        queriesController.dashboardMessages(request.user.id),
        queriesController.dashboardProperties(request.user.id),
        queriesController.getUser(request.user.id)
    ])
        .then(([messages, property, user]) => {
            response.render('dashboard', {messages, property, user: user[0]})
        })
        .catch((err) => {
            return response.send(err);
        });
};

module.exports.deleteProperty = (request, response) => {
    queriesController.deleteProperty(request.body.deleteButton)
        .then(results => {
            response.redirect('/dashboard');
        }).catch((err) => {
        return response.send(err);
    });
};