'use strict'
require('dotenv').config({ silent: true });
const session         = require('express-session');
const cookieParser    = require('cookie-parser');
const bodyParser      = require('body-parser');
const express         = require('express');
const logger          = require('morgan');
const path            = require('path');
const app             = express();
const authRouter      = require('./routes/auth/auth.js');
const userRouter      = require('./routes/api/users.js');
const apiRouter       = require('./routes/api/apiRoute.js');
const profileRouter   = require('./routes/profile/profile.js');
const landingRouter   = require('./routes/landing/landing.js');
const expressJWT      = require ('express-jwt');
const jwt             = require('jsonwebtoken'); //(and this line maybe in auth.js too?)

const PORT            = process.argv[2] || process.env.PORT || 3000;
const secret          = 10;

app.use(logger('dev'));

app.set('proyekt3', 'tacos are delicious');

app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true }));

// Parses application/JSON
app.use(bodyParser.json());

app.use(expressJWT({ secret: 'proyekt3' }).unless({ path: ['/', '/login', '/register', '/landing']}));

app.listen(PORT, () => { console.log('Ja zees app is listening, just like KGB')});

app.get('/landing', (req, res) => {
 res.sendFile(path.join(__dirname, 'public/landing.html'));
});


app.use('/api', apiRouter);
app.use('/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/landing', landingRouter);
app.use('/profile', profileRouter);
