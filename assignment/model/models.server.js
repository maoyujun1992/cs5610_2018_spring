var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://maoyujun:myj19920610@ds263707.mlab.com:63707/heroku_j5ljcbl0');

module.exports = db;
