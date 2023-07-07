var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
require('dotenv').config();
var mongoose = require('mongoose');
const mongoAtlasUri =
    `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@cluster0.h62b0ay.mongodb.net/`;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var albumsRouter = require('./routes/albums');
var artistsRouter = require('./routes/artists');

var app = express();

app.use(cors());
app.use(express.static('images'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/albums', albumsRouter);
app.use('/artists', artistsRouter);

try {
    mongoose.connect(
        mongoAtlasUri,
        { useNewUrlParser: true, useUnifiedTopology: true }
    );
} catch (e) {
    console.log("could not connect");
}
const db = mongoose.connection;
db.once('open', () => {
    console.log("Connected to MongoDB");
});

module.exports = app;
