'use strict';
const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth');
const control = require('../controller/user');

router.post('/register', async (req,res) => {
    try {
        const info = await control.register(req.body).catch(error => {
            throw new Error(error);
        });
        res.send({response: {result:info,description:'sucess',staus:200}});
    } catch (error) {
        res.send({response: {result:error.toString(),description:'faliure',staus:'500'}});
    }
});


router.post('/login', async (req,res) => {
    try {
        const info = await control.login(req.body).catch(error => {
            throw new Error(error);
        });
        res.send({response: {result:info,description:'sucess',staus:200}});
    } catch (error) {
        res.send({response: {result:error.toString(),description:'faliure',staus:'500'}});
    }
});

router.post('/passport', auth, async(req,res) => {
    try {
        console.log(req.body.address);
        const info = await control.applyPassport(req.body,req.decode).catch(error => {
            throw new Error(error);
        });
        res.send({response:{result:info,description:'success',status:200}});
    } catch (error) {
        res.send({response:{result:error.toString(),description:'failure',status:500}});
    }

});

module.exports = router;