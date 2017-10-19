var consolidate = require('consolidate'),
express = require('express'),
assert = require('assert'),
MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/video',function(err,db){

	assert.equal(null,err);
	console.log('successfully connected to Mongodb server');

	db.collection('movies').find({}).toArray(function(err,docs){

		docs.forEach(function(doc){
			console.log(doc.title);
		})

		db.close();
	});
	console.log('Called find()');
});