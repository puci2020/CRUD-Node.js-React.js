const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let River = new Schema({
    river_name: {
        type: String
    },
    river_length: {
        type: String
    },
    river_depth: {
        type: String
    }
});

module.exports = mongoose.model('River', River);
