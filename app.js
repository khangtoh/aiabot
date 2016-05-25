var restify = require('restify')

// Setup Restify Server
var app = restify.createServer();
app.use(restify.queryParser());
app.use(restify.bodyParser());
// Webhooks
// GET
app.get('/webhooks', function (req, res) {
console.log("webhooks: %s" , req.query['hub']['verify_token']);
  if (req.query['hub']['verify_token'] === 'aia_bot_verify_token') {
  	res.write(req.query['hub']['challenge']);
  	res.end();
  }
  res.send(200,'Error, wrong validation token');
  res.next();
  
})

// POST
app.post('/webhooks', function (req, res) {

	if (req.body && req.body.entry) {
		messaging_events = req.body.entry[0].messaging;
		for (i = 0; i < messaging_events.length; i++) {
			event = req.body.entry[0].messaging[i];
			sender = event.sender.id;
			if (event.message && event.message.text) {
		  	text = event.message.text;
		  	console.log("webhooks[POST]: ",text);
			}
		}
	}
  
  res.send(200);
  res.next();

});

app.listen(process.env.port || 3978, function () {
    console.log('%s listening to %s', app.name, app.url);
});
