---
layout: post
title: "Building an RSS bot for Telegram with AWS Lambda"
description: "In this post we illustrate how to create an RSS bot with Superfeedr, Amazon Lambda for the Telegram messenger."
tags: [rss, bot, webhook]
---

In this post we illustrate how to create an **RSS bot** with [Superfeedr](http://superfeedr.com/), [Amazon Lambda](https://aws.amazon.com/lambda/) for the [Telegram messenger](https://telegram.org).

What's an RSS bot you ask? Well, that's simple. It's a chat bot which answers the following commands: `/subscribe http://blog.superfeedr.com/atom.xml` and will then send you messages when the feed updates. Are you using Telegram? [Try it by yourself](https://telegram.me/superfeedr_bot)!

In practice, both Superfeedr and Telegram's bot API rely on **webhooks** ([PubSubHubbub is webhooks](http://blog.superfeedr.com/webhooks-improved/) with benefits). This means that our app's main goal will be to *translate incoming messages* from one to the other. We'll do that by processing incoming HTTP requests from a service and trigger and outbound HTTP request to the other.

### Lambda

Given that our app is extremely simple, there's certainly no need to use a complex web framework, nor to have a long running application which would just wait for the requests. We're looking for a platform which triggers a simple script upon HTTP requests.

[AWS lambda](https://console.aws.amazon.com/lambda/home) is an Amazon Web Service which does just this:

> AWS Lambda is a compute service that runs developers' code in response to events and automatically manages the compute resources for them, making it easy to build applications that respond quickly to new information.

Let's start by creating a new lambda. Lambda lets us chose among multiple *blueprints*. We pick their *hello world* example which uses Node.js. For now, let's leave the code as is. We decided to name the lambda "webhook" and we make sure to use the *Basic Execution Role*. 

![Lambda Blueprint](/images/rss-bot-telegram-lambda/select-blueprint.png)

We finish by reviewing and creating the lambda.

![Review Lambda](/images/rss-bot-telegram-lambda/review-lambda.png)


### API Gateway

As is, our lambda can only be invoked from *inside* the AWS tools. We'd like to expose it to the outside world and specifically to the open web! For this, we'll use another AWS tool: [API Gateway](https://console.aws.amazon.com/apigateway/home) which is able to route HTTP requests to various AWS tools. Let's start by creating an API.

![new API Gatewar](/images/rss-bot-telegram-lambda/new-api-getaway.png)

Once our API has been created, we need to attach methods. Let's create a `POST` method on the `/` path and configure what happens when our API getaway receive a POST request. We pick 'Lambda function', select the region and enter our **lambda's ARN** (which you can get from your lambda's page, in the top right corner)

![Gateway to Lambda](/images/rss-bot-telegram-lambda/gateway-lambda-integration.png)

AWS warns us that we're now exposing our lambda function to the outside which means, in practice that anyone could make requests and trigger costs. On the next screen, AWS shows a summary of the integration. 

![Integrating Lambda](/images/rss-bot-telegram-lambda/integration-summary.png)

Here we need to change how the HTTP request is mapped into our lambda's parameters. Click on `Integration Request`. On the next screen, expand `Mapping Templates` and add a mapping the `application/json` Content-Type. On the right, click on the small pencil (or on Mapping Template) and enter the following template:

{% prism javascript %}
{
	"chat_id": "$input.params('chat_id')",
	"body": $input.json('$')
}
{% endprism %}

This tells Amazon that you want to pass an object with 2 keys to your lambda with:

* `chat_id` being the `chat_id` query string param's value and,
* `body` being the JSON body of the request.

Make sure you save the mapping template and finally click on the *Deploy* button to deploy the API gateway. AWS will ask you to pick a `stage` for your deployment. We chose `v0`. 

![Stage Summary](/images/rss-bot-telegram-lambda/stage-summary.png)


{% prism bash %}

$ curl -X POST -D- 'https://xcdzbx40nb.execute-api.us-east-1.amazonaws.com/v0/'
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 4
Connection: keep-alive
X-Cache: Miss from cloudfront
Via: 1.1 30dd680654516e0c9a09ff445a6eed36.cloudfront.net (CloudFront)
X-Amz-Cf-Id: dS7uTpA5e9r1Mu4GHfURQIYV7UWSXS075loEqKJi06pDMwYVukgvTw==

null

{% endprism %}

Right now our lambda does nothing... which mean that it returns null by default. We're now done plugging everything on the *backend* side of things! 

### Plugging the bot

[Creating a Telegram bot](https://core.telegram.org/bots) is meta... you do it using the bot [BotFather](https://telegram.me/botfather). Follow the bot's instructions :

![Stage Summary](/images/rss-bot-telegram-lambda/create-bot.png)

At the bottom, you see the authentication token, which you should keep secret! 

Telegram can invoke our webhook for any incoming message to our bot. All messages will be sent as a JSON blob to our lambda function. Telegram offers the `setWebhook` call which does just this:

{% prism bash %}

$ curl -X POST "https://api.telegram.org/bot126929150:AAGdigQnMlKj0fmhQf4SnNC7C4LOyABjYrI/setWebhook" \
-d'url=https://xcdzbx40nb.execute-api.us-east-1.amazonaws.com/v0/'

{"ok":true,"result":true,"description":"Webhook was set"}

{% endprism %}

### Plugging Superfeedr

The first step is to create a [subscriber account](https://superfeedr.com/subscriber) (you could also use a [tracker account](https://superfeedr.com/tracker) if you're interesting in tracking mentions). Make sure you then [create a token](http://superfeedr.com/tokens/new) with the `subscribe` rights. 

### Implementing the bot

We finaly reach the actual code :) We replace our lambda's code with the following:
We tried to document the code to make sure each piece is pretty straightforward.

{% prism javascript %}

/* Includes */
var querystring = require('querystring');
var https = require('https');

/* The url of our lambda. This will be sent to superfeedr when subscribing to feeds*/
var lambda = "https://xcdzbx40nb.execute-api.us-east-1.amazonaws.com/v0/";

/* The Superfeedr credentials */
var superfeedrCredentials = {
  login: 'telegrambot',
  token: '7e4de2150d78defc8b314486167560cf'
};

/*The telegram credentials*/
var telegramBotAuth = "126929150:AAGdigQnMlKj0fmhQf4SnNC7C4LOyABjYrI";


/* Main lambda function. context is the object from the API gateway mapping */
exports.handler = function(event, context) {
  if(typeof(event["chat_id"]) != 'undefined' && event["chat_id"] !== '') {
    return superfeedrHandler(event, context);
  }
  
  if(event["body"] && event["body"]["message"] && typeof(event["body"]["message"]["chat"]) != 'undefined') {
    return telegramHandler(event, context);
  }
  return context.succeed("Hum. who are you?");
};

/* A (simpistic) library to post to Telegram */
var telegramBot = {
  // Sends a message to the chatId. Calls callback when done
  sendMessage: function(chatId, message, callback) {
    var data = querystring.stringify({
      'chat_id': chatId,
      'text': message
    });

    var req = https.request({
      method: 'POST',
      host: 'api.telegram.org',
      port: 443,
      path: '/bot' + telegramBotAuth + '/sendMessage',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': data.length,
      }
    }, function(res) {
      res.on('end', function() {
        callback(null);
      });
    });
    req.on('error', callback);
    req.write(data);
    req.end();
  },

  // Responds to a telegram message
  respondMessage: function(chatId, message, callback) {
    return callback({"method": "sendMessage", "chat_id": chatId, "text": message});
  }
}

/* A (simpistic) library to send requests to Superfeedr */
var superfeedr = {
  // Subscribes to a feed. Uses the chatID to build the callback url so that we know were each feed notification needs to be sent
  subscribe: function(feed, chatID, callback) {
    var data = querystring.stringify({
      'hub.mode': 'subscribe',
      'hub.topic': feed,
      'hub.callback': lambda + "?chat_id=" + chatID,
      'format': 'json'
    });
    var auth = 'Basic ' + new Buffer(superfeedrCredentials.login + ':' + superfeedrCredentials.token).toString('base64');
    var req = https.request({
      method: 'POST',
      host: 'push.superfeedr.com',
      port: 443,
      path: '/',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': data.length,
        'Authorization': auth
      }
    }, function(res) {
      var body = '';
      res.setEncoding('utf8');
      res.on('data', function(chunk) {
        body += chunk;
      });
      res.on('end', function() {
        callback(null);
      });
    });
    req.on('error', callback);
    req.write(data);
    req.end();
  }
}

/* Handles messages from Superfeedr. */
function superfeedrHandler(event, context) {
  // If we have no items, this must be a notification about an error in the feed
  if(!event["body"]["items"]) {
    return telegramBot.sendMessage(event["chat_id"], "Hum. We got a problem fetching content from " + event["body"]["status"]["feed"] + ". You may want to unsubscribe from it.", function() {
      return context.succeed("Thanks"); 
    });
  }
  // For each new item in the feed, let's send it to 
  event["body"]["items"].forEach(function(item) {
    return telegramBot.sendMessage(event["chat_id"], [item.title, item.permalinkUrl].join(' : '), function() {
      return context.succeed("Thanks"); 
    });    
  });
}

/*
  Handles chat messages from Telegram.
  We should identify commands and handle them
  We should respond for the commands we dd not process or do not understand
*/
function telegramHandler(event, context) {
  if(!event["body"]["message"] || !event["body"]["message"]["text"]) {
    return context.succeed({}); // Meh
  }
  var command = parseCommand(event["body"]["message"]["text"]);
  handleCommand(command, event["body"]["message"]["chat"]["id"], function(message) {
    return telegramBot.respondMessage(event["body"]["message"]["chat"]["id"], message, function(response) {
      context.succeed(response)
    })
  });
}

/* Handles commands... mostly sends messages to Superfeedr!*/
function handleCommand(command, chatId, cb) {
  if(!command)
    return cb('I am sorry, but this is not a valid command. Try /subscribe <feed>');
  if(command.subscribe) {
    // Let's go now do our Superfeedr subscription!
    superfeedr.subscribe(command.subscribe[0], chatId, function(error) {
      if(error)
        return cb('We could not subscribe you to this feed... sorry!')

      return cb('Done! Next time the feed updates, you\'ll be the first to know!');
    });
  }
  else {
    return cb('I am sorry, but this is not a valid command. Try /subscribe <feed>');
  }
}

/* 
  Parses commands passed via chat from the user.
*/
function parseCommand(text) {
  // We need to 
  var tokens = text.split(' ');
  if(!tokens[0].match(/^\//))
    return null;
  var command = {};
  var cmd = tokens.shift();
  var m;
  if(m = cmd.match(/\/(\w*)/)) {
    command[m[1]] = tokens;    
  }
  return command;
}

{% endprism %}

Of course, this bot is quite limited for now... for example, you could add more commands, such as `unsubscribe`, `list`. You could also add support for Telegram's custom keyboards!









