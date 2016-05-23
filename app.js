var restify = require('restify')

// Setup Restify Server
var app = restify.createServer();
app.use(restify.queryParser());

app.get('/webhooks', function (req, res) {
console.log("webhooks: %s" , req.query['hub']['verify_token']);
  if (req.query['hub']['verify_token'] === 'aia_bot_verify_token') {
  	var challenge =  req.query['hub']['challenge'];
  	var body = req.query['hub']['challenge']
  	console.log("got challenge: %s",req.query['hub']['challenge']);
  	res.write(body);
    res.end();
  }
  res.send('Error, wrong validation token');
})


app.listen(process.env.port || 3978, function () {
    console.log('%s listening to %s', app.name, app.url);
});
