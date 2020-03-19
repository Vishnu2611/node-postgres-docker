
let express = require('express');
let path = require('path');
let pdf = require('html-pdf');
let ejs = require('ejs');
let app = express();
app.set('view engine','ejs');
app.use( express.static( './views/uploads' ) );
let cert = {
    name: 'Vishnu',
    Degree: 'B-tech',
    Course: 'Computer Science',
    Eno: 'VML15CS060',
    YOP: '2019',
    COS: 'Vimal Jyothi Engineering College',
    CGPA: '7.68',
    cid: '123456789010',
    url: 'pp.jpeg'
};
 name = ejs.render('<%= cert.name %>', {cert:cert});
 Degree = ejs.render('<%= cert.Degree %>', {cert:cert});
 Course = ejs.render('<%= cert.Course %>', {cert:cert});
 Eno = ejs.render('<%= cert.Eno %>', {cert:cert});
 YOP = ejs.render('<%= cert.YOP %>', {cert:cert});
 COS = ejs.render('<%= cert.COS %>', {cert:cert});
 CGPA = ejs.render('<%= cert.CGPA %>', {cert:cert});
 cid = ejs.render('<%= cert.cid %>', {cert:cert});
 url = ejs.render('<%= cert.url %>', {cert:cert});
app.get('/' , (req, res) => {
    // let cert = {
    //     name: 'Vishnu',
    //     Degree: 'B-tech',
    //     Course: 'Computer Science',
    //     Eno: 'VML15CS060',
    //     YOP: '2019',
    //     COS: 'Vimal Jyothi Engineering College',
    //     CGPA: '7.68',
    //     cid: '123456789010',
    //     url: '/views/uploads/pp.jpeg'
    // };
    // ejs.renderFile(path.join(__dirname, './views/', 'card.ejs'), {students: cert}, (err, data) => {
    //     if (err) {
    //         console.log(err);
    //         res.send(err);
    //     } else {
    //         let options = {
    //             format: 'letter',
    //             orientation: 'portrait',
    //             zoomFactor: '0', // default is 1
    //             type: 'pdf',
    //             quality: '100'
    //         };
    //         console.log(data);
    //         pdf.create(data, options).toFile(function (err, data) {
    //             if (err) {
    //                 res.send(err);
    //             } else {
    //                 res.contentType('application/pdf');
    //                 res.sendFile(data.filename);
    //             }
    //         });
    //     }
    // });
    res.render('crcard');
    console.log(__dirname);
});

app.listen( 3000,function() {
    console.log('Server is up on 3000');
});