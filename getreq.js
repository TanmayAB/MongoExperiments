var express = require('express'),
engines = require('consolidate'),
app = express();
var assert = require('assert');


app.engine('html',engines.swig);
app.set('view engine','html');
app.set('views',__dirname + '/views');

function errorHandler(err, req, res, next){
	console.log(err.message);
	console.log(err.stack);
	res.status(500);
	res.render('error_template', {error:err});
}

app.use(errorHandler);


app.get('/:name',function(req,res){

	var name = req.params.name;
	var getvar1 = req.query.getvar1;
	var getvar2 = req.query.getvar2;

	res.render('hello', {name : name, getvar1 : getvar1, getvar2 : getvar2 });
	
});

app.use(function(req,res){
	console.log('I don\'t know why');
	res.sendStatus(404);
});


var server = app.listen(3000, function(){
	var port = server.address().port;
	console.log('Express server is listening at port : ' + port);
});