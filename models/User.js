const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
const { Schema } = mongoose;
// the previous two are the same. The second is saying that mongoose has a property schema denoted in the {} known as structuring

const userSchema = new Schema({
	googleId: String
});

module.exports = mongoose.model('users', userSchema);