---
title: "Welcoming Google Feeds API users"
description: ""
tags: [javascript, feeds, api ]
image: ""
---

It finally happened, Google shutdown their feed API after 6 months of deprecation. Many many websites are now broken and yours may be too.
Superfeedr is an alternative and we'd love to see you move over.

## TL;DR

* Superfeedr is *not exactly* like Google. Yet, what you achieved with their API can **also be achieved with Superfeedr**...
* [We charge](https://superfeedr.com/pricing#subscribers) for our services. There is a free tier but you may go beyond it.
* Each RSS/Atom feed you'll be polling from us has to be **previously subscribed to** (we need to know about the feed)
* Think about the [other way to use Superfeedr: push](http://blog.superfeedr.com/ways-to-use-superfeedr/)!

## Loading feeds using Javascript and Jquery

This is, by far, the most common request we're getting, so we're diving into this as an example and a detailed tutorial.

### Open a *subscriber* account

We provide 3 types of account. For our use case, we need a [subscriber account](http://superfeedr.com/subscriber/). This should be simple and straight forward.

Subscribers can retrieve content from 3rd party feeds, as well as be notified when these feeds changed. We are also able to convert these feeds to JSON for the subscribers.

### Create an authentication token

When interracting with Superfeedr's API, you should use tokens. Each token has different *rights* and you can create and delete an unlimited number of tokens.

Here, we want to [create a token](http://superfeedr.com/tokens/new) to **retrieve**, so we only check that box. We also give a name to the token.

<img src="/images/create-token.png" style="" />

Once the token has been created, click on its name and you should see its value.

<img src="/images/token-created.png" style="" />


### Subscribe

It's now time to tell Superfeedr *which feed(s)* you want to retrieve from Superfeedr. We call this *subscribing*. Here, we assume that the list of feeds is already known, so we can do it using the Superfeedr website... but you could also do it programatically by sending [API requests to subscribe](http://documentation.superfeedr.com/subscribers.html#adding-feeds-with-pubsubhubbub).

From the Superfeedr dashboard, click on [Manage Subscriptions](https://superfeedr.com/subscriptions). If you're just starting, you should see an empty table with the mention *There are no matching subscription.*. Click on the "New Subscription" button in the bottom right corner. This should open a modal like this one.

<img src="/images/new-subscription.png" style="" />

* `hub.topic` is the url of the feed to which you want to subscribe
* `format` : pick `json`
* `hub.callback`: put `https://push.superfeedr.com/dev/null`. This tells us that you [don't want us to send you notifications](/null-device/).
* You can leave the last field empty.

Repeat this step for *any feed you want to retrieve from us later*.


### Retrieve the content

Now comes the most important part: the API request. The content is directly accessible from a **single URL**. The Superfeedr PuSH console can help us build this url which can later integrate in our Javascript application. From the dashboard, click on "[Debug PuSH API requests](https://superfeedr.com/push_console)".

> The console lets you build requests and test them.

<img src="/images/push-console-retrieve.png" style="" />

* Step 1: in the dropdown, pick the token you created earlier.
* Step 2: in the dropdown, select the `retrieve` mode.
* Step 3: add the right values to each parameter:
  * `hub.topic` should be the feed URL.
  * `count` is the number of items you want to retrieve
  * `format` use `json`
  * You can leave the other fields empty.

The rightmost column shows you the request being built for the [command line tool curl](http://curl.haxx.se/docs/manpage.html). However, if you click on the *Open in new tab* button, you can also see the result in your browser directly, and you can of course copy the URL to use it in your application.

For my example, the [URL I get is this one](https://push.superfeedr.com/?hub.mode=retrieve&hub.topic=http%3A%2F%2Ffeeds.gawker.com%2Fgizmodo%2Ffull&count=10&format=json&authorization=ZGVtbzo0ZjdlMThjNDYyYjI0MzU0NmRlODUzMzljOWFhMDcwYQ%3D%3D&).

### Implementing in your javascript application

This part is not specific to Superfeedr at all... but it should still be helpful if you're integrating the RSS feed in your pages. Here's how to invoke the API from jquery:

{% prism javascript %}

var url =
"https://push.superfeedr.com/?hub.mode=retrieve&hub.topic=http%3A%2F%2Ffeeds.gawker.com%2Fgizmodo%2Ffull&count=10&format=json&authorization=ZGVtbzo0ZjdlMThjNDYyYjI0MzU0NmRlODUzMzljOWFhMDcwYQ%3D%3D&"; // See above!

$.ajax({
  url: url,
  dataType: 'json',
  success: function(data) {
    // Data now contains the feed data!
    // Check our schema for details: http://documentation.superfeedr.com/schema.html#json
    console.log(data);
    // This will log the content to your browser's console.
  }
});

{% endprism %}


### Final note

Of course, there are many other things which you can do with Superfeedr like these

* [retrieving multiple feeds](http://blog.superfeedr.com/retrieve-multiple-feeds/) in one single call
* [combining feeds](http://blog.superfeedr.com/combining-feeds/)
* [get realtime update in javascript](http://blog.superfeedr.com/server-sent-events/), using Server Sent Events
* [integrate with angular](http://blog.superfeedr.com/angularjs-superfeedr/)
* [add a feed reader to any page](http://blog.superfeedr.com/river-news/)

Please, get in touch with any question or comment!






