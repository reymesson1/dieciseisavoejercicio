var mongoose = require('mongoose');

module.exports = mongoose.model('detail',{    
    position: String,
    date: String,
    description: String,
    value: Number,
    type: String,
    item1: String,
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})