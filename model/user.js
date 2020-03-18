'use strict';
const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('user',{
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
        }
    },
    email: {
        type: Sequelize.TEXT,
        allowNull: false,
        unique: true,
        validate:{
            isEmail: true
        }
    },
    password: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate:{
            passwordLength(value){
                if(value === null && value.length<6) {
                    throw new Error('Password is too short minimum length is 6');
                }
            },
            notEmpty: true
        }
    }
});
module.exports = User;
