var mongoose = require('mongoose');

module.exports = mongoose.model('master',{    
    position: String,
    date: String,
    description: String,
    value: Number,    
    item1: String,
    items: Array,
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})