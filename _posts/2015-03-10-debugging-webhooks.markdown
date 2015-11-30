---
layout: post
title: "Debugging Webhooks"
js_includes: []
tags: [webhook, debug, pubsubhubbub, replay]
---

A [webhook](https://en.wikipedia.org/wiki/Webhook) is a very common design pattern for HTTP APIs. Webhooks provide an elegant mechanism for developers who are interested in changes happening "rarely" on an HTTP resource (or API). They are sometimes called *callback URL*.

In the context of [PubSubHubbub](https://en.wikipedia.org/wiki/PubSubHubbub) (and Superfeedr, by extension), A 3rd party developer wants to know when a new entry has been added to a feed. The *subscription* mechanism (sometimes called *registration*) allows the 3rd party developer to provide an HTTP url which will receive a POST request when the feed has been updated.

Debugging webhooks is not always obvious because the process is usually asynchronous: the 3rd party developer (subscriber) has to wait for the resource to be updated.

## Triggering Updates

Superfeedr provides 2 mechanisms to troubleshoot your callback urls. The first one is a [simple application](http://push-pub.appspot.com/) which mimicks a publishing tool. It lets you [add messages to a feed](http://push-pub.appspot.com/). The feed is a [PubSubHubbub publisher](https://superfeedr.com/publisher) which means that as soon as you click the submit button, the feed is updated, [the hub](http://pubsubhubbub.superfeedr.com/) is notified and each subscriber's webhook is called.

Another tool that we provide is called *replay notifications*. Once you're subscribed to a feed, you can easily replay previous notifications. This is very convenient to troubleshoot your webhooks.

The [docs give you some details](http://documentation.superfeedr.com/subscribers.html#replaying-notifications), but here's an example.

{% prism bash %}
curl -X GET 'http://push.superfeedr.com/' 
-u demo:demo
-d'hub.mode=replay' 
-d'hub.topic=https://superfeedr-blog-feed.herokuapp.com/' 
-d'hub.callback=http://my.webhook/path'
-D-
{% endprism %}

Immediately after this call, the webhook will be triggered with the content of the latest entry in our blog's feed.

## Inspecting Content

Once you can easily reproduce and trigger notifications, you should start inspecting the content of the notifications. Most languages used to create web application will let you log the HTTP headers and the body of the notification, but you could also use applications created for that purpose such as [WebhookInbox](http://webhookinbox.com) or [Requestb.in](http://requestb.in/). 

Both application let you create disposable webhooks and they both support **PubSubHubbub's verification mechanism**. 

Once a webhook is triggered, they will log the complete request (headers and body). You can then easily inspect it and see exactly what your code received.

See also:

* [How to Implement PubSubHubbub](http://blog.superfeedr.com/howto-pubsubhubbub/)
* [Replaying Notifications](http://blog.superfeedr.com/replaying-notifications/)
* [PubSubHubbub is Webhooks with Benefits](http://blog.superfeedr.com/webhooks-improved/)
