const queriesController = require('../controllers/queriesController');


const displayFavorites = (request, response, next) => {

    let userid = request.user.id;

    queriesController.getFavorites(userid)
        .then(result => {
            response.render('favorites', {result})
        })
        .catch((err) => {
            return response.send(err);
        });
};

const deleteFavorite = (request, response) => {
    console.log(request.body.deleteButton, request.user.id);
    queriesController.deleteFavorite(request.body.deleteButton, request.user.id)
        .then(results => {
            request.flash('success_msg', 'Favorite property has been deleted successfully.')
            response.redirect('/favorites');
        }).catch((err) => {
        return response.send(err);
    });
};

module.exports = {
    displayFavorites,
    deleteFavorite
};


