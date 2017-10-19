var express = require('express'),
engines = require('consolidate'),
app = express();
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');


app.engine('html',engines.nunjucks);
app.set('view engine','html');
app.set('views',__dirname + '/views');


MongoClient.connect('mongodb://localhost:27017/video',function(err,db){

	assert.equal(null,err);
	console.log('successfully connected to Mongodb server');

	app.get('/',function(req,res){

		console.log('searching for html')
		db.collection('movies').find({}).toArray(function(err,docs){
			res.render('movies',{'movies' : docs});
		});
		db.close();
	});

	app.use(function(req,res){
		console.log('I don\'t know why');
		res.sendStatus(404);
	});

	console.log('Called find()');
});



var server = app.listen(3000, function(){
	var port = server.address().port;
	console.log('Express server is listening at port : ' + port);
});