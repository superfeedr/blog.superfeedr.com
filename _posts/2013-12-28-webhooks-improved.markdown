---
title: "PubSubHubbub is webhooks with benefits"
tags: [webhook, pubsubhubbub, http]
---

[Webhooks](http://en.wikipedia.org/wiki/Webhook) provide a very elegant solution to the *polling problem*, and many popular APIs such as [Github](http://developer.github.com/v3/repos/hooks/), [Mailchimp](http://apidocs.mailchimp.com/webhooks/), [Instagram](http://instagram.com/developer/realtime/#) or even [Shopify](http://docs.shopify.com/manual/settings/notifications/webhooks) provide such hooks.

However, we will see that they also have a bunch of limitations which are elegantly solved by [PubSubHubbub](https://en.wikipedia.org/wiki/PubSubHubbub) and we want to encourage people with Webhook systems to consider these problems and maybe implement PubSubHubbub on top of them.

*Note: Even though PubSubHubbub was initially designed for RSS and Atom, [its latest iteration](https://superfeedr-misc.s3.amazonaws.com/pubsubhubbub-core-0.4.html) is now completely agnostic as to what data is exchanged, making it very suitable for JSON resouces*

###Automation

Most webhooks patterns will require the developer to *manually* enter the callback on a specific interface. In practice it means that it's quite hard to automate (using a script) the addition or removal of a webhook.

Even though some services may have an API to add a callback, it's  specific to each of them.

PubSubHubbub provides a simple REST API, using a what we call a hub url (an API endpoint). Send a simple POST request to either set a hook: `hub.mode=subscribe` or remove it: `hub.mode=unsubscribe` along with the resource (`hub.topic`) to which you want to hook (`hub.callback`) and the webhook to use.

###Discovery

Now, even if an API allows for automation of addition and removal of a hook, you'll still need to find what's the resource to which you can subscribe, and what's the endpoint (the hub) to which you need to send these requests. This is where **discovery** comes handy.

The discovery pattern is actually quite common and defines how to find 'linked' resources. For example, using HTML, you can find the [favicon](http://en.wikipedia.org/wiki/Favicon) of a page using the `<link>` pattern.

PubSubHubbub provides a similar discovery pattern which relies on the [Link HTTP header](http://www.w3.org/wiki/LinkHeader). It's a simple mechanism which allows any resource to point to the subscription endpoint, which we call **hub** in PuSH. Since we use the HTTP headers, it obviously works for any type of HTTP accessible ressource (from JSON to images... etc).

###Dialback

Most webhook mechanism are subject to some kind of *denial of service attack*. In practice, nothing prevents a malicious user from entering any url in a webhook form, so that the API will be the one sending POST request to the webhook upon updates. If the updates are frequent enough, it's possible to harm the recipient of all these notifications.

It's also possible to imagine a webhook that communicates back with the API again, triggering more webhooks... and generating loops which can be hamrful for the API.

An easy workaround to such threats is to perform a dialback. When the API gets a new webhook, it could call it and *expect* a specific result. If the condition is met, then the hook can be saved, and if not, it should be dropped. That's what PubSubHubbub does with its [verification of intent](https://superfeedr-misc.s3.amazonaws.com/pubsubhubbub-core-0.4.html#verifysub) mechanism.

Using such a pattern also removes the need for user accounts when implementing a webhook system for simple applications with no user account logic.

###Authenticated delivery

Another security threat when dealing with webhooks is to make sure that the *service calling the webhook is the service with which this webhook had been registered*. Of course, it is recommanded to use **obfuscated** -hard to guess- urls for your webhooks, but that's not secure and if someone eventually guesses the url, there is a significant risk of receiving **forged** data. 

PubSubHubbub solves that thru the use of a secret exchanged upon subscription (using SSL!). The secret is then used to compute and [HMAC signature](http://en.wikipedia.org/wiki/Hash-based_message_authentication_code) passed along for delivery and the recipient should check that that provided signature is the same as the computed one and drop the data if they differ.

###Reusing code

**PubSubHubbub is just a simple layer on top of webhooks** which makes a lot of aspects easier and more secure. It provides simple and standard mechanisms which can be implemented in re-usable code. 

