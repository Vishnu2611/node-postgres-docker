'use strict';
const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth');
const control = require('../controller/user');
const multer = require('multer');
const pdf = require('html-pdf');
const path = require('path');
const ejs = require('ejs');

const storage = multer.diskStorage({
    destination: (req,file,next) => {
        next(null,'./views/uploads');
    },
    filename: (req,file,next) => {
        next(null,file.originalname);
    }
});

const fileFilter = (req,file,next) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        next(null,true);
    }
    else{
        next(new Error('Not an image file!!'),false);
    }
};

const upload = multer({
    storage:storage,
    limits:{
        fileSize: 1024*1024*5
    },
    fileFilter: fileFilter
});

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
        res.send({response: {result:error.toString(),description:'faliure',staus:500}});
    }
});

router.post('/passportApplication', auth, upload.single('userImage'), async(req,res) => {
    try {
        const info = await control.applyPassport(req.body,req.decode,req.file.path).catch(error => {
            throw new Error(error);
        });
        res.send({response:{result:info,description:'success',status:200}});
    } catch (error) {
        res.send({response:{result:error.toString(),description:'failure',status:500}});
    }

});

router.get('/passport', auth, async(req,res) => {
    try {
        const passportDetails = await control.getPassport(req.decode.aadharNumber).catch(error => {
            throw new Error(error);
        });
        console.log(passportDetails);
        ejs.renderFile(path.join(__dirname, '../views', 'passport.ejs'), {passportDetails: passportDetails}, (error, data) => {
            if (error) {
                throw new Error (error);
            }
            else {
                let options = {
                    format: 'letter',
                    orientation: 'landscape',
                    zoomFactor: '0.25', // default is 1
                    type: 'pdf',
                    quality: '100'
                };
                pdf.create(data, options).toFile((error, data) => {
                    if (error) {
                        throw new Error(error);
                    }
                    else {
                        res.contentType('application/pdf');
                        res.status(200).download(data.filename);
                    }
                });
            }
        });
    } catch (error) {
        res.send({
            response:{
                result:error.toString(),
                description:'failure',
                staus: 500
            }
        });
    }
});


module.exports = router;