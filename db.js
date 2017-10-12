const Sequelize = require('sequelize')

const sequelize = new Sequelize(undefined, undefined, undefined, {
    'dialect': 'mysql',
    'storage': 'db.sql'
});

sequelize.sync().then(function () {
    console.log('Everything is synced.')
})