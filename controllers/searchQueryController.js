const models = require('../models');
const sequelize = require('sequelize');
const Op = sequelize.Op;

const searchByZipcode = (zip) => {
    return models.Properties.findAll({where: {zipcode: {[Op.like]: '%' + zip + '%'}}, limit: 10, raw: true})
};

const searchByCity = (city) => {
    return models.Properties.sequelize.query("SELECT * FROM `Properties` WHERE `city` LIKE :search_name",
        {replacements: {search_name: '%' + city + '%'}, type: sequelize.QueryTypes.SELECT})
};

const famousSearch = () => {
    return models.Properties.sequelize.query("SELECT * FROM `Properties` WHERE `city` LIKE :search_name",
        {replacements: {search_name: '%' + 'San Francisco' + '%'}, type: sequelize.QueryTypes.SELECT})
};


const filterSearchByCity = (city, minPrice, maxPrice, minNumBedrooms, maxNumBedrooms, minNumBathrooms, maxNumBathrooms) => {
    return models.Properties.sequelize.query("SELECT * FROM `Properties` " +
        "WHERE `city` LIKE :search_name AND :minPrice <= `price` AND :maxPrice > `price` AND " +
        ":minNumBedrooms <= bedrooms AND :maxNumBedrooms >= bedrooms AND " +
        ":minNumBathrooms <= bathrooms AND :maxNumBathrooms >= bathrooms",
        {
            replacements: {
                search_name: '%' + city + '%', minPrice: minPrice, maxPrice: maxPrice,
                minNumBedrooms: minNumBedrooms, maxNumBedrooms: maxNumBedrooms, minNumBathrooms: minNumBathrooms,
                maxNumBathrooms: maxNumBathrooms
            }, type: sequelize.QueryTypes.SELECT
        })
};

const filterSearchByZipCode = (zipCode, minPrice, maxPrice, minNumBedrooms, maxNumBedrooms, minNumBathrooms, maxNumBathrooms) => {
    return models.Properties.sequelize.query("SELECT * FROM `Properties` " +
        "WHERE `zipcode` LIKE :search_zipcode AND :minPrice <= `price` AND :maxPrice > `price` AND " +
        ":minNumBedrooms <= bedrooms AND :maxNumBedrooms >= bedrooms AND " +
        ":minNumBathrooms <= bathrooms AND :maxNumBathrooms >= bathrooms",
        {
            replacements: {
                search_zipcode: '%' + zipCode + '%', minPrice: minPrice, maxPrice: maxPrice,
                minNumBedrooms: minNumBedrooms, maxNumBedrooms: maxNumBedrooms, minNumBathrooms: minNumBathrooms,
                maxNumBathrooms: maxNumBathrooms
            }, type: sequelize.QueryTypes.SELECT
        })
};

module.exports = {
    searchByZipcode,
    searchByCity,
    famousSearch,
    filterSearchByCity,
    filterSearchByZipCode
};