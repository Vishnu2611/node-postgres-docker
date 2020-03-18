'use strict';
const Sequelize = require('sequelize');
const sequelize = new Sequelize('certify', 'postgres', 'test123', {
    host: 'localhost',
    dialect:  'postgres'
});

module.exports = sequelize;
