---
title: "Node Superfeedr"
---

It’s long overdue, but we built a little node.js library to interact
with Superfeedr from any node.js application. I want to thank [Martin
Borho](https://github.com/mborho) for his precious help, as well as
[Astro](http://spaceboyz.net/~astro/) for his amazing work on
[node-xmpp](https://github.com/astro/node-xmpp)

### A bit of theory

We built this wrapper using our [XMPP
API](http://documentation.superfeedr.com/subscribers.html#xmpppubsub).

This may sound surprising to a lot of you, as I have advised to a lot of people to use PubSubHubbub when they were building a web app.

The main reason behind this is that *Node.js is the perfect framework to integrate an XMPP client*, transparently. For most people the syntax behind any node application is a bit odd with all these callbacks. It simply comes from the fact that Node.js is an implementation of the very famous reactor pattern. This means that **node.js can handle stateful protocols** (like XMPP) very well… Most of web framework do not offer this, because they map HTTP’s stateless’s approach.

### Installing

NPM is now a first class citizen in node… which means you can install
superfeedr-node with a simple:

{% prism javascript %}  
 npm install -g superfeedr
{% endprism %}

### Usage

In your node application, just instantiate a new Superfeedr Client,
connect it, subscribe to feeds you need, and handle incoming
notifications. It should all be relatively self-explanatory.

{% prism javascript %}
var Superfeedr = require('superfeedr').Superfeedr;
client = new Superfeedr("login", "password");
client.on('connected', function() {
  client.subscribe("http://blog.superfeedr.com/atom.xml", function(err, feed) {
    // console.log(feed);
    // { url: 'http://blog.superfeedr.com/atom.xml',
    //   title: 'Superfeedr Blog : Real-time cloudy thoughts from a super-hero',
    //   httpCode: 200,
    //   httpStatus: '37345B in 0.602513587s, 0/10 new entries',
    //   period: 43200,
    //   nextFetch: 1323523524000,
    //   lastFetch: 1323479726000,
    //   lastParse: 1323479726000,
    //   lastMaintenance: 1323401451000 }
  });
  client.on('notification', function(notification) {
    // console.log(notification);
    // { feed: 
    //    { url: 'http://push-pub.appspot.com/feed',
    //      title: 'Publisher example',
    //      httpCode: 200,
    //      httpStatus: '4775B in 0.170247116s, 1/20 new entries',
    //      period: 43200,
    //      nextFetch: 1323527327000,
    //      lastFetch: 1323482789000,
    //      lastParse: 1323482791000,
    //      lastMaintenance: 1323436703000 },
    //   entries: 
    //    [ { id: 'http://push-pub.appspot.com/feed/93006',
    //        postedTime: 1323482787,
    //        updated: 1323482787,
    //        title: 'Hello',
    //        summary: '',
    //        content: 'World',
    //        actor: [Object] } ] }
  });
});
{% endprism %}


### FAQs!

* Will this work behind the firewall?
Yes! As opposed to PubSubHubbub, the connection initiated by the
client is kept alive (XMPP FTW!), so Superfeedr can just use this
connection to send you the data :)

* Will this work on fully-managed platforms (Nodejitsu, Heroku…)?
Yes! Of course... this should work very well!

* It sucks, can I make it better?
Please do, [fork it](https://github.com/superfeedr/superfeedr-node)!

