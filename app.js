const express = require('express');
const morgan = require('morgan');
const path = require('path');
const session = require('connect-flash');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const connect = require('./models');

const app = express();
connect();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// app.set('port', process.env.PORT || 8001);

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/img', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false, 
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
}));
app.use(flash());

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.render('error');
});

// app.listen(app.get('port', () => {
//     console.log(app.get('port', '번 포트에서 대기중'));
// }));
const port = process.env.PORT || 3000; 
app.listen(port, function () { console.log('Updated : Server listening at port %d', port); }); 