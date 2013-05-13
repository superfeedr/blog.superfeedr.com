---
layout: post
title: XMPP-FTW XMPP and JSON for the Web
categories: []
author_name: Julien
author_uri: http://twitter.com/julien51
author_email_md5: b30ce50678f0e934eaa6697425c59dd7
---

XMPP always had a special place in our heart. It's an amazing protocol which comes with presence, addressing, as well as PubSub baked in. It's no surprise we've had an [XMPP API](http://superfeedr.com/documentation#xmpp_pubsub) since day 1 at Superfeedr.

Now, though, XMPP scares a lot of people because of it's X part: it uses XML as its data schema. Knowing that, Lloyd, an extremely talented web developer invented a very elegant solution for people to *discover* XMPP without dealing with the XML at all, thru [XMPP for the Web](https://xmpp-ftw.jit.su/) (XMPP-FTW).

### XMPP-FTW

XMPP-FTW is actually a proxy XMPP client which converts all the XML into a json API. It sits between the XMPP server and any app which can consume JSON. It supports the code XMPP protocol as well as a bunch of other features, including Superfeedr.

[The demo](https://xmpp-ftw.jit.su/demo) is quite helpful to understand exactly what is going on. You can perform calls and configure them. In the back, they'll be converted by XMPP-FTW to regular XMPP stanzas. Similarly, incoming XMPP messages will be converted into javsacript events which your app can handle.

### Superfeedr support

Recently, [Lloyd added support](http://www.evilprofessor.co.uk/615-xmpp-ftw-now-supports-superfeedr/) for the Superfeedr API and it's a great playground to get started. Here is a little HOW-TO that you can try in [the demo app](https://xmpp-ftw.jit.su/demo). (you could also run your own XMPP-FTW)

* Type `xmpp.login`, in the 'event name' box.
* Options should appear in the following grey box. Replace them with `{"jid": "demo@superfeedr.com","password": "demo"}`. Hit 'send'.
* Quickly, you should see an incoming event indicating that you're now connected to Superfeedr XMPP server!
* Type `xmpp.superfeedr.subscribe` 
* Complete the option box with `{ "feed": "http://push-pub.appspot.com/feed"}`
* You should see a response indicating that you're now subscribed to that feed. The response also includes its status, the last time we parsed the feed... etc
* In another browser tab, publish something new in that feed [using this app](http://push-pub.appspot.com/).
* You should see the incoming notification in XMPP-FTW!

That's that simple and you should quickly replace the example feed url with any feed url that you may be interested in susbcribing to.

Also, once you've played with XMPP-FTW a bit more, we stringly encourage you to look at XMPP in more details. It's a very elegant protocol and federates by default (as opposed to many APIs out there). 


