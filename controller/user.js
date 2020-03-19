'use strict';
const user = require('../model/user');
const jwt = require('jsonwebtoken');
const config = require('../config/index');
const passport = require('../model/passport');
const md5 = require('md5');
exports.register = async (body) => {
    return new Promise((resolve, reject) => {
        user.create({
            firstName: body.firstName,
            middleName: body.middleName,
            lastName: body.lastName,
            aadharNumber: body.aadharNumber,
            email: body.email,
            password: md5(body.password)
        }).then((result) => {
            resolve(result.dataValues);
        }).catch((err) => {
            reject(err);
        });
    });
};

exports.login = async (body) => {
    return new Promise((resolve, reject) => {
        user.findAll({where:{email:body.email}}).then((result) => {
            console.log('sda');
            console.log();
            if(result.length !== 0){
                if(result[0].dataValues.password === md5(body.password)) {
                    jwt.sign({email: result[0].dataValues.email,aadharNumber: result[0].dataValues.aadharNumber,firstName: result[0].dataValues.firstName,middleName: result[0].dataValues.middleName,lastName: result[0].dataValues.lastName}, config.configVariables.secret, {expiresIn: config.configVariables.expiretime},(error, token) => {
                        if(!error) {
                            resolve(token);
                        }
                        else {
                            reject(error);
                        }
                    });
                }
                else {
                    throw new Error('Passwords Don\'t match');
                }
            }
            else {
                throw new Error('No such user is created.');
            }
        }).catch((err) => {
            reject(err);
        });
    });
};

exports.applyPassport = async (body,decode,path) => {
    return new Promise ((resolve,reject) => {
        passport.create({
            firstName: decode.firstName,
            middleName: decode.middleName,
            lastName: decode.lastName,
            aadharNumber: decode.aadharNumber,
            DOB: body.DOB,
            bloodGroup: body.bloodGroup,
            sex: body.sex,
            nationality: body.nationality,
            userImagePath: path,
            address: body.address
        }).then(result => {
            resolve(result.dataValues);
        }).catch(error => {
            reject(error);
        });
    });
};

exports.getPassport = async (id) => {
    return new Promise((resolve,reject) => {
        passport.findByPk(id).then(result => {
            if(result.length !== 0){
                resolve(result.dataValues);
            }
            else{
                throw new Error('No such application');
            }
        }).catch(error => {
            reject(error);
        });
    });
};

