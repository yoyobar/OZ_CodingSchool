require('dotenv').config();
const cors = require('cors');
const express = require('express');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const connectWithDB = require('./config/db');
const cloudinary = require('cloudinary').v2;

const app = express();
connectWithDB();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

//? 미들웨어
app.use(cookieParser());
app.use(
    cookieSession({
        name: 'session',
        maxAge: process.env.COOKIE_TIME * 24 * 60 * 60 * 1000,
        keys: [process.env.SESSION_SECRET],
        sameSite: 'none',
    })
);
app.use(express.json());
app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    })
);

app.use('/', require('./routes'));

app.listen(process.env.PORT || 8000, (err) => {
    if (err) {
        console.log(err);
    }

    console.log(`server is Running ${process.env.PORT}`);
});
