'use strict';
const jwt = require('jsonwebtoken');
const config = require('../config/index');
let log4js = require('log4js');
let logger = log4js.getLogger('Webapplication');
logger.level = 'debug'; // default level is OFF - which means no logs at all.
const auth = (req,res,next) => {
    const token = req.headers.authorization.replace('Bearer ','');
    logger.info(token);
    jwt.verify(token,config.configVariables.secret,(error,decoded)=>{
        if(error) {
            res.send({response:{result:error,description:'failure',status:401}});
        }
        else {
            req.decode = decoded;
            next();
        }
    });
};
module.exports = auth;