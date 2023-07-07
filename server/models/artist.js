const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
    artistName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageURL: {
        type: String
    }
});

module.exports = mongoose.model('Artist', artistSchema);