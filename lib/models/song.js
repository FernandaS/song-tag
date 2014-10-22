"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var Song = new Schema({
	name: {type: String, required: true},
	album: {type: String},
	genre: {type: String},
	released_on: {type: Date},
	is_explicit: {type: Boolean, required: true},

	tag: [{type: ObjectId, ref: 'Tag'}],
	artist: [{type: ObjectId, ref: 'Artist'}]
})

module.exports = mongoose.model('Song', Song);