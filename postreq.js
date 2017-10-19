var express = require('express'),
engines = require('consolidate'),
app = express();
var assert = require('assert');

var bodyParser = require('body-parser')

app.engine('html',engines.swig);
app.set('view engine','html');
app.set('views',__dirname + '/views');

function errorHandler(err, req, res, next){
	console.log(err.message);
	console.log(err.stack);
	res.status(500);
	res.render('error_template', {error:err});
}


app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
app.use(errorHandler);

var jsonParser = bodyParser.json()


app.get('/',function(req,res){

	res.render('fruit_picker', {'fruits' : ['apple', 'banana', 'grapes','organges']});
	
});

app.post('/favorite_fruit', function(req,res,next){
	console.log(req)
	favorite = req.body.fruit
	if(typeof favorite === 'undefined'){
		next(Error('Please choose a fruit first'));
	}
	else{
		res.send('your favorite fruit is ' + favorite);
	}
});

app.use(function(req,res){
	console.log('I don\'t know why');
	res.sendStatus(404);
});


var server = app.listen(3000, function(){
	var port = server.address().port;
	console.log('Express server is listening at port : ' + port);
});