const models = require('../models');
const sequelize = require('sequelize');
const Op = sequelize.Op;
const validator = require('validator');

module.exports.porcessSearch =function(request, response) {
    if (!request.body) return response.sendStatus(400);
    const query = request.body.searchQuery;


    /*
    The following if else statements is using a vailidator library to first check if the string
    is digits olny, if its not then serch by city else vailid the zipcode and then serach by zip.

    Link to the library https://github.com/chriso/validator.js
    */
    if(!validator.isNumeric(query)) {
        searchByCity(query)
    }
    else {
        if(!validator.isPostalCode(query, 'US')) {
            return response.send('Invalid Zip Code')
        }
        else {
            searchByZipcode(query)
        }
    }


    /*
    This search function is showing you how to use sequelize to get the results from the database,
    the rest is just using NodeJS Promises, rather then using plain JS callbacks.

    More examples can be found here: http://docs.sequelizejs.com/manual/tutorial/querying.html
    */
    function searchByZipcode(zip) {
        models.Properties.findAll({where: {zipcode: {[Op.like]: '%'+zip+'%'}}, limit: 10, raw: true })
            .then(results => {response.render('results', {results})
            })
            .catch((err) => {
                return response.send(err);
            })
    }


    /*
    This search function is showing you how to use raw SQL query to get the results from the database,
    the rest is just using NodeJS Promises, rather then using plain JS callbacks.

    More examples can be found here: http://docs.sequelizejs.com/manual/tutorial/raw-queries.html
    */
    function searchByCity(city) {
        models.Properties.sequelize.query("SELECT * FROM `Properties` WHERE `city` LIKE :search_name",
            { replacements: { search_name: '%'+city+'%' }, type: sequelize.QueryTypes.SELECT })
            .then(results => {response.render('results', {results})
            })
            .catch((err) => {
                return response.send(err);
            });
    }


};

function sortByPrice() {
    models.Properties.findAll({order: sequelize.col('price')})
        .then(results => {
            console.log(results)
        })
        .catch((err) => {
            return response.send(err);
        })
}