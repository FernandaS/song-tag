"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var Artist = new Schema({
	name: {type: String, require: true, uniqueness: true},
	bio: {type: String},
	genres: [{type: String, uniqueness: true}],

	songs: [{type: ObjectId, ref: 'Song'}]

})

module.exports = mongoose.model('Artist', Artist); 