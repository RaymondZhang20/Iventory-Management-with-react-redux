var express = require('express');
var router = express.Router();
const Artist = require('../models/artist');

router.get('/nameToId', function(req, res, next) {
    Artist.find({artistName: req.body.artistName}).select('_id').then((artist) => {
        if (!artist) {
            res.status(404).send('Cannot found the artist');
        } else {
            res.status(200).json(artist);
        }
    }).catch((err) => {
        res.status(500).json({message: err.message});
    });
});

router.get('/', function(req, res, next) {
    Artist.find().then((artist) => {
        if (!artist) {
            res.status(404).send('Cannot found the artists');
        } else {
            res.status(200).json(artist);
        }
    }).catch((err) => {
        res.status(500).json({message: err.message});
    });
});

router.get('/:id', function(req, res, next) {
    Artist.findById(req.params.id).then((artist) => {
        if (!artist) {
            res.status(404).send('Cannot found the artist');
        } else {
            res.status(200).json(artist);
        }
    }).catch((err) => {
        res.status(500).json({message: err.message});
    });
});

module.exports = router;
