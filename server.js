
//express.js related
var PORT = 8088;
var express = require('express');
var app = express();

// serving static files
app.use('/public', express.static(__dirname + '/public'));

// vars for my app
var ready_last = new Date();
//var check_last = new Date();

// init the headers for the browser
//====================================================================== 
function initHeaders(res) {
	res.set({
		"Access-Control-Allow-Origin":"*",
		"Access-Control-Allow-Headers":"Content-Type"
	});
}

// check entry from the browser
//====================================================================== 
app.get('/check', function(req, res) {
	//console.log( req );
	initHeaders(res);
	//res.json(makeAnswer("success", null, res_));	//express function

	// new protocol for numerous clients
	res.write(JSON.stringify(ready_last));
	res.end();
});

// check entry from command lines or other inputs to get the next check request ok
//====================================================================== 
app.get('/ready', function(req, res) {
	initHeaders(res);
	console.log("request for ready");
	//we store the ready command time
	ready_last = new Date();
	res.end();	// no answer really needed
});


////////////////// petit message when starting ////////////////
app.listen(PORT);
console.log('Server running on port '+PORT);
console.log('Add <script src="localhost:'+PORT+'/public/cedreload.js"></script> in your page.');


////////////////// Ending the server ////////////////
process.on('SIGINT', function() {
	console.log('Recieve SIGINT');
	process.exit();
});
