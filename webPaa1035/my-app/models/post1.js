var mongoose = require('mongoose');

module.exports = mongoose.model('post1',{    
    position: String,
    date: String,
    description: String,
    value: Number,
    type: String,
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})