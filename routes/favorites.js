const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const favoritesController = require('../controllers/favoritesController');
const queriesController = require('../controllers/queriesController');


router.get('/', authController.isAuthenticated, (req, res) => {
    queriesController.getUser(req.user.id)
        .then(user => {
            if (user[0].agent === 0) {
               favoritesController.displayFavorites(req, res)
            } else {
                res.redirect('/fa17g11/')
            }
        })
    res.title('Favorites')
});

router.post('/delete', favoritesController.deleteFavorite);


module.exports = router;