---
title: "Building a News Bot for Facebook Messenger"
description: "We built a news bot Facebook Messenger which lets you follow you favorite websites and be notified when they publish new stories."
tags: ["bot", "rss", "facebook", "news", "chatbot"]
js_includes: []
image: "/images/facebook-messenger-logo.jpg"
crosspost_to_medium: true
---

With each month that goes by, there is less and less doubt that messaging applications and bots are one of the interfaces with whom we are interacting more and more. One of the verticals for which messaging applications are the most useful is news.

We built a news bot Facebook Messenger which lets you follow you favorite websites and be notified when they publish new stories.

## Try it first

If you have a Facebook account, you should start by testing the news bot to see what it's capable of. It's as easy as [opening this link](https://m.me/superfeedr). You should now be able to start a conversation with Superfeedr's bot. First I usually say _Hello_.

The bots let you then type (or paste really), the URL of your favorite site. I chose [Superfeedr's Medium publication](https://medium.com/superfeedr-thoughts) so I typed `http://medium.com/superfeedr-thoughts`. The bot then uses [Feediscovery](http://feediscovery.appspot.com/) to find an relevant RSS feed and asks for a final confirmation. Once this is all set, the next time the publication publishes something, you should get a message from the bot to read that story.

This is a pretty simple bot but already does wonders!

## How we built it

The quick answer is that we took the exact same code base that we used for [Telegram bot we built last year](https://blog.superfeedr.com/rss-bot-telegram-lambda/). It also runs on Amazon's Lambda infrastructure which, even if it is complex to set up is **perfect of webhook based services**.

The whole bot code is [available on Github](https://github.com/superfeedr/news-bot).

### Setting things up on Facebook.

First, we have to [build a Facebook application](https://developers.facebook.com/). You also need a Facebook page as Facebook's Messenger bots are linked to a page.

Switch to the Messenger settings and start by generating a token that you'll use to send requests to the Facebook API. For this, you need to select  the page that users will interact with. Copy this token to the settings [in the `init` file](https://github.com/superfeedr/news-bot/blob/master/src/_init.js).

![Generate Token](/images/facebook-news-bot/token-generation.png)

Then, you have to configure the webhooks for incoming messages.

The base URL is where our service will be deployed (you should use an Amazon Lambda URL if you're deploying your bot there). Our code routes incoming webhooks using the `platform` query string parameter.

We also specify the types of messages we want to receive: `message_deliveries`, `messages`, `messaging_optins`, `messaging_postbacks`.

Facebook will send a verification of intent request (PubSubHubbub FTW!) and you should set a random verification token: the bot's code should handle that by default.

![Webhook Settings](/images/facebook-news-bot/facebook-webhooks-settings.png)

After that you should be all set.

<small>Feel free to follow the [quick start instructions](https://developers.facebook.com/docs/messenger-platform/guides/quick-start) in Facebook's docs for more details.</small>

### Architecture overview

The news bot code is routing incoming events based on the `platform` query string value. Each message is sent to the right platform handler to be parsed. Each of these platform handlers (Facebook and Telegram for now) implements a `parseChatMessage` method which yields back to the main router.

The main router then identifies the command. We currently support the following commands: _hello_, _help_, _list_, _subscribe_, _unsubscribe_, _url_ and _version_. Once they have been executed; they themselves call the platforms to send back messages to users. By using this, we can let **each platform implement its own specific features**, such as buttons or custom keyboards.

When a user starts to follow a feed, we issue a [subscription request to Superfeedr](https://documentation.superfeedr.com/subscribers.html#adding-feeds-with-pubsubhubbub). The callback URL used for these subscriptions includes the `platform` as well as a unique `chatId` to identify the exact user who should receive the data. By doing this, we **do not have to store any state inside our bot**, making the webhook pattern trivial to scale.

Finally, when Superfeedr sends a notification to the news bot, we extract the platform and chat id from the callback URL, as well as the content of the message and invoke the platform's `sendMessage` method.


### The future

Adding support for more platforms such as Slack or Kik should be fairly simple. We could also start adding more commands such as `track` to implement the [tracker capabilities of Superfeedr](https://documentation.superfeedr.com/trackers.html).

Please, let us know what you think! You're more than welcome to fork the code!