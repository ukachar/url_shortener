const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const urlSchema = new Schema({
    original_url: {
        type: String,
        unique: true
    },
    tiny_url: {
        type: String,
        unique: true
    },

}, { collection: 'url_shortener' }); // Specify the collection name here

module.exports = mongoose.model('Url', urlSchema);