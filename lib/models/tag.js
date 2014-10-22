"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var Tag = new Schema({
	name: {type: String, required: true, uniquiness: true},

	song: [{type: ObjectId, ref: 'Song'}],
})

module.exports = mongoose.model('Tag', Tag);