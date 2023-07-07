const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    imageURL: {
        type: String
    },
    artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artist'
    }
});

module.exports = mongoose.model('Album', albumSchema);