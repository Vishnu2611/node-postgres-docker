'use strict';
const Sequelize = require('sequelize');
const user = require('./user');
const sequelize = require('../config/database');

const Passport = sequelize.define('passport',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false
    },
    firstName: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    middleName: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    lastName: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    aadharNumber: {
        type: Sequelize.TEXT,
        allowNull: false,
        primaryKey: true,
        validate:{
            len: [12,12],
            isNumeric: true
        },
        references: {
            model: user,
            key: 'aadharNumber'
        }
    },
    DOB: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    bloodGroup: {
        type: Sequelize.ENUM,
        values:['O-','O+','A-','A+','B-','B+','AB-','AB+'],
        allowNull: false,
    },
    sex: {
        type: Sequelize.ENUM,
        values: ['Male','Female','Others'],
        allowNull: false
    },
    nationality: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    address: {
        type: Sequelize.JSON,
        allowNull: false,
    }
});
module.exports = Passport;
