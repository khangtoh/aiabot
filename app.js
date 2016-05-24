var restify = require('restify')

// Setup Restify Server
var app = restify.createServer();
app.use(restify.queryParser());

app.get('/webhooks', function (req, res) {
console.log("webhooks: %s" , req.query['hub']['verify_token']);
  if (req.query['hub']['verify_token'] === 'aia_bot_verify_token') {
  	res.write(req.query['hub']['challenge']);
  	res.end();
  }
  res.send(200,'Error, wrong validation token');
})


app.listen(process.env.port || 3978, function () {
    console.log('%s listening to %s', app.name, app.url);
});
