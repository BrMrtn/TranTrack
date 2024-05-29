const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Z7A244');

mongoose.set('strictQuery', true);

module.exports = mongoose;