"use strict";

var express = require('express');
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var app = express();
app.use(bodyParser());
mongoose.connect('mongodb://localhost/myMusic');
var connection = mongoose.connection;
connection.once('open', function(){
	console.log('Successfully saved myMusic mongoDB')
})


var Artist = require('./lib/models/artist');
var Song = require('./lib/models/song');
var Tag = require('./lib/models/tag');


app.post('/artists', function(req, res){
	var newArtist = new Artist(req.body.artist);
	newArtist.save(function(err, artist){
		if(!err){
			res.status(200).send(artist.name + ' was Successfully added.');
		} else {
			res.send(err);
		}
	});
})

app.get('/artists', function(req, res){
	Artist.find().exec(function(err, artists){
		if(!err){
			res.status(200).send(artists);
		} else {
			res.send(err);

		}
	})
})

//search on postman using Nelly as the params. 

app.get('/artists/:name', function(req, res){
	Artist.findOne({name: req.params.name}, function(err, artist){
		if(!err){
			res.status(200).send(artist);
		} else {
			res.send(err);
		}
	})
})

app.post('/artists/:name/songs', function(req, res){
	Artist.findOne({name: req.params.name}, function(err, artist){
		if(!err){
			var newSong = new Song(req.body.song);
			newSong.save(function(err, song){
				artist.songs.push(song)
				artist.save(function(err, artist){
					if(!err){
						res.status(200).send(song.name + " was Successfully added to " + artist.name)
					}else {
						res.send(err)
					}
				})
			})
		} else {
			res.send(err);
		}
	});
});


app.post('/song/:id/tags', function(req, res){

	Tag.findOneAndUpdate({name: req.body.name}, req.body, {upsert: true}).exec(function(err, tag){

		Song.findOne({id: req.params.id}).populate('tags').exec(function(err, song){
			song.tags.push(tag);
			song.save(function(err, song){
				res.send(tag.name + " was Successfully added " + song.name);
			})
		})
	})
})

//routes go here

app.listen(8000, function(){
	console.log('Listening on port ' + 8000)
});
 