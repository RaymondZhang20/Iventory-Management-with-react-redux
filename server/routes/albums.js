var express = require('express');
var albumsRouter = express.Router();
const Album = require('../models/album');

async function getAlbum(req, res, next) {
    let album;
    try {
        album = await Album.findById(req.params.id);
        if (album == null) {
            return res.status(404).json({message: 'Cannot find the album'});
        }
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
    res.album = album;
    console.log("s");
    next();
}

async function getAllAlbums(req, res, next) {
    try {
        const albums = await Album.find().populate({path:'artist',select:'_id artistName'});
        res.json(albums);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}

async function getSorted(req, res, next) {
    try {
        const albums = await Album.find().populate({path:'artist',select:'_id artistName'});
        const sortedItems = albums.sort((a, b) => a.price - b.price);
        res.send(sortedItems);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}

async function getFiltered(req, res, next) {
    try {
        const filter = req.query.artists.split(',').map(a => {
            return a===""? {artist: null}: {artist: a};
        })
        const query = {
            $or: filter
        };
        const albums = await Album.find(query).populate({path:'artist',select:'_id artistName'});
        res.send(albums);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}

function patchAlbum(req, res, next) {
    Album.findByIdAndUpdate(req.params.id, req.body, {returnDocument:'after', runValidators: true}).populate({path:'artist',select:'_id artistName'}).then((album) => {
        if (!album) {
            res.status(404).send('Cannot found the album');
        } else {
            res.status(200).json(album);
        }
    }).catch((err) => {
        res.status(500).json({message: err.message});
    });
}

function deleteAlbum(req, res, next) {
    Album.findByIdAndRemove(req.params.id).then((album) => {
        if (!album) {
            res.status(404).send('Cannot found the album');
        } else {
            res.status(200).json(album);
        }
    }).catch((err) => {
        res.status(500).json({message: err.message});
    });
}

async function postAlbum(req, res, next) {
    const newAlbum = new Album({
        itemName: req.body.itemName,
        description: req.body.description,
        price: req.body.price,
        imageURL: req.body.imageURL,
        artist: req.body.artist
    });
    try {
        await newAlbum.save();
        const saved = await newAlbum.populate({path:'artist',select:'_id artistName'});
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
}

albumsRouter.get('/', getAllAlbums);

albumsRouter.get('/sorted', getSorted);

albumsRouter.get('/filtered', getFiltered);

albumsRouter.get('/:id', getAlbum, function(req, res, next) {
    res.json(res.album);
});

albumsRouter.patch('/:id', patchAlbum);

albumsRouter.delete('/:id', deleteAlbum);

albumsRouter.post('/', postAlbum);

module.exports = {albumsRouter, getAlbum, getAllAlbums, getSorted, getFiltered, patchAlbum, postAlbum, deleteAlbum};