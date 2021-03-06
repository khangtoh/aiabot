var restify = require('restify')
var http = require('http');

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
	console.log("webhooks[POST]: start");
	console.log(JSON.stringify(req.body));
	if (req.body && req.body.entry) {
		messaging_events = req.body.entry[0].messaging;
		for (i = 0; i < messaging_events.length; i++) {
			event = req.body.entry[0].messaging[i];
			sender = event.sender.id;
			if (event.message && event.message.text) {
		  		text = event.message.text;
		  		console.log("webhooks[POST]: entry ",text);
		  		sendTextMessage(sender, "Text received, echo: "+ text.substring(0, 200));
			}
		}
	}
  
  res.send(200);
  res.next();

});

app.listen(process.env.port || 3978, function () {
    console.log('%s listening to %s', app.name, app.url);
});

var client = restify.createJsonClient({
  url: 'https://graph.facebook.com'
});



function replyText(sender, text) {
	console.log("replyText to ",sender,text);
	var token = "EAAPfDeNZBkSEBAGNQEWeT9K3qTLV0T8xZC09GxqUmAL1ENBlZAwyH2SDyU98lcQ9bZCXuPAyhXk23JBTKGRVvVqVOwydYfOKKXiPqSoOiMG05sDvdGKcZCv6OZCfml8y5tpH65ZCDAchf9O2B2o9KZCCY5Yp0pSkdUfTL2W1ZB8caaAZDZD";

	var options = {
	  path: '/v2.6/me/messages?access_token='+token,
	  body: {
	  	recipient: {id:sender},
      	message: {text:text }
      }
	};

	var client = restify.createJsonClient({
  		url: 'https://graph.facebook.com'
	});

	client.post(options.path, { hello: 'world' }, function(err, req, res, obj) {
  		assert.ifError(err);
  		console.log('%d -> %j', res.statusCode, res.headers);
  		console.log('%j', obj);
	});
	console.log("return replyText");
	return ;

	var options = {
	  path: '/v2.6/me/messages?access_token='+token,
	  body: {
	  	recipient: {id:sender},
      	message: {text:text }
      }
	};

	console.log(options.path);



	client.post(options, function(err,req,res) {
		if (err) {
			console.log('Error sending message: ', error);
		}
		else {
			console.log('sent: ', res.error);
		}
	});
}


function sendTextMessage(sender, text) {
var token = "EAAPfDeNZBkSEBAGNQEWeT9K3qTLV0T8xZC09GxqUmAL1ENBlZAwyH2SDyU98lcQ9bZCXuPAyhXk23JBTKGRVvVqVOwydYfOKKXiPqSoOiMG05sDvdGKcZCv6OZCfml8y5tpH65ZCDAchf9O2B2o9KZCCY5Yp0pSkdUfTL2W1ZB8caaAZDZD";

  messageData = {
    text:text
  }
  http.request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {access_token:token},
    method: 'POST',
    json: {
      recipient: {id:sender},
      message: messageData,
    }
  }, function(error, response, body) {
    if (error) {
      console.log('Error sending message: ', error);
    } else if (response.body.error) {
      console.log('Error: ', response.body.error);
    }
  });
}

