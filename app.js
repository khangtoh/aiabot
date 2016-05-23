var restify = require('restify');

// Setup Restify Server
var botapp = restify.createServer();


botapp.get('/webhooks', function (req, res) {
  if (req.query['hub.verify_token'] === 'aia_bot_verify_token') {
    res.send(req.query['hub.challenge']);
  }
  res.send('Error, wrong validation token');
})


botapp.listen(process.env.port || 3978, function () {
    console.log('%s listening to %s', botapp.name, botapp.url);
});
