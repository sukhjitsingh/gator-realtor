const validator = require('validator');

const searchQueryController = require('../controllers/searchQueryController');
const queriesController = require('../controllers/queriesController');

module.exports.porcessSearch = (request, response) => {
    if (!request.body) return response.sendStatus(400);
    const query = request.body.searchQuery;

    /*
    The following if else statements is using a validator library to first check if the string
    is digits only, if its not then search by city else valid the zipcode and then search by zip.

    Link to the library https://github.com/chriso/validator.js
    */
    if (!validator.isNumeric(query)) {
        searchQueryController.searchByCity(query)
            .then(results => {
                if (results.length === 0) {
                    searchQueryController.famousSearch()
                        .then(res => {
                            queriesController.getAllImages()
                                .then(images => {
                                    const imageMap = images.reduce((memo, image) =>
                                        Object.assign({}, memo, {[image.propertyId]: image}), {});
                                    const results = res.map(property =>
                                        Object.assign({}, property, {image: imageMap[property.id]}));
                                    response.render('results', {results, found: 0})
                                });
                        })
                        .catch((err) => {
                            return response.send(err);
                        });
                } else {
                    helperFunc(results, response);
                }
            })
            .catch((err) => {
                return response.send(err);
            });

    }
    else {
        if (!validator.isPostalCode(query, 'US')) {
            request.flash('error_msg', 'Invalid Zip Code'); //should be validated in bootstrap
            response.redirect('/')      //should be rendered result page
        }
        else {
            searchQueryController.searchByZipcode(query)
                .then(results => {
                    if (results.length === 0) {
                        searchQueryController.famousSearch()
                            .then(res => {
                                queriesController.getAllImages()
                                    .then(images => {

                                        const imageMap = images.reduce((memo, image) =>
                                            Object.assign({}, memo, {[image.propertyId]: image}), {});
                                        const results = res.map(property =>
                                            Object.assign({}, property, {image: imageMap[property.id]}));
                                        response.render('results', {results, found: 0})
                                    });
                            })
                            .catch((err) => {
                                return response.send(err);
                            });
                    } else {
                        helperFunc(results, response);
                    }
                })
                .catch((err) => {
                    return response.send(err);
                })
        }
    }
};


const helperFunc = (res, response) => {
    queriesController.getAllImages()
        .then(images => {
            const imageMap = images.reduce((memo, image) =>
                Object.assign({}, memo, {[image.propertyId]: image}), {});
            const results = res.map(property =>
                Object.assign({}, property, {image: imageMap[property.id]}));

            response.render('results', {results, found: results.length})
        });
};

module.exports.applyFilters = (request, response) => {
    let minPrice = 0;
    let maxPrice = 1000000000;
    let minNumBedrooms = 1;
    let maxNumBedrooms = 100;
    let minNumBathrooms = 1;
    let maxNumBathrooms = 100;


    if (request.body.price !== "") {
        switch (request.body.price) {
            case '1':
                maxPrice = 100000;
                break;
            case '2':
                minPrice = 100001;
                maxPrice = 500000;
                break;
            case '3':
                minPrice = 500001;
                maxPrice = 1000000;
                break;
            case '4':
                minPrice = 1000001;
                break;
        }
    }

    if (request.body.bedrooms !== "") {
        switch (request.body.bedrooms) {
            case '1':
                maxNumBedrooms = 3;
                break;
            case '2':
                minNumBedrooms = 4;
                maxNumBedrooms = 6;
                break;
            case '3':
                minNumBedrooms = 7;
                break;
        }
    }

    if (request.body.bathrooms !== "") {
        switch (request.body.bathrooms) {
            case '1':
                maxNumBathrooms = 3;
                break;
            case '2':
                minNumBathrooms = 4;
                maxNumBathrooms = 6;
                break;
            case '3':
                minNumBathrooms = 7;
                break;
        }
    }

    const byCity = (query, minPrice, maxPrice, minNumBedrooms, maxNumBedrooms, minNumBathrooms, maxNumBathrooms) => {

        searchQueryController.filterSearchByCity(query, minPrice, maxPrice, minNumBedrooms, maxNumBedrooms, minNumBathrooms, maxNumBathrooms)
            .then(results => {
                if (results.length === 0) {
                    searchQueryController.topPriceSearch()
                        .then(res => {
                            queriesController.getAllImages()
                                .then(images => {

                                    const imageMap = images.reduce((memo, image) =>
                                        Object.assign({}, memo, {[image.propertyId]: image}), {});
                                    const results = res.map(property =>
                                        Object.assign({}, property, {image: imageMap[property.id]}));
                                    response.render('results', {results, found: 0})
                                });
                        })
                        .catch((err) => {
                            return response.send(err);
                        });
                } else {
                    helperFunc(results, response);
                }
            })
            .catch((err) => {
                return response.send(err);
            });
    };

    const byZipcode = (query, minPrice, maxPrice, minNumBedrooms, maxNumBedrooms, minNumBathrooms, maxNumBathrooms) => {
        searchQueryController.filterSearchByZipCode(query, minPrice, maxPrice, minNumBedrooms, maxNumBedrooms, minNumBathrooms, maxNumBathrooms)
            .then(results => {
                if (results.length === 0) {
                    searchQueryController.topPriceSearch()
                        .then(res => {
                            queriesController.getAllImages()
                                .then(images => {

                                    const imageMap = images.reduce((memo, image) =>
                                        Object.assign({}, memo, {[image.propertyId]: image}), {});
                                    const results = res.map(property =>
                                        Object.assign({}, property, {image: imageMap[property.id]}));
                                    response.render('results', {results, found: 0})
                                });
                        })
                        .catch((err) => {
                            return response.send(err);
                        });
                } else {
                    helperFunc(results, response);
                }
            })
            .catch((err) => {
                return response.send(err);
            });
    };


    const query = request.body.searchQuery;

    if (!validator.isNumeric(query)) {
        byCity(query, minPrice, maxPrice, minNumBedrooms, maxNumBedrooms, minNumBathrooms, maxNumBathrooms);
    } else {
        if (!validator.isPostalCode(query, 'US')) {
            request.flash('error_msg', 'Invalid Zip Code'); //should be validated in bootstrap
            response.redirect('/')      //should be rendered result page
        }
        else {
            byZipcode(query, minPrice, maxPrice, minNumBedrooms, maxNumBedrooms, minNumBathrooms, maxNumBathrooms);
        }
    }
};


module.exports.famousSearch = (request, response) => {
    searchQueryController.famousSearch()
        .then(res => {
            queriesController.getAllImages()
                .then(images => {
                    const imageMap = images.reduce((memo, image) =>
                        Object.assign({}, memo, {[image.propertyId]: image}), {});
                    const results = res.map(property =>
                        Object.assign({}, property, {image: imageMap[property.id]}));
                    response.render('index', {results})
                })
        })
        .catch((err) => {
            return response.send(err);
        });
};