---
layout: post
title: "Replaying Notifications"
author_name: Julien
author_uri: http://ouvre-boite.com
author_email_md5: b30ce50678f0e934eaa6697425c59dd7
js_includes: []
---

Debugging webhook patterns is tricky because they're mostly asynchronous: the *subscribing* (which listens to the webhook) side usually does not control the *publishing* side (which triggers the webhook).

To help with that, we usually recommend our customers to check [this very simple publishing application](http://push-pub.appspot.com/) and [its feed](http://push-pub.appspot.com/feed). They provide a simple mechanism to update a feed and check the incoming notification. However, the data in the feed is not nearly as rich as [our schema allows](http://documentation.superfeedr.com/schema.html). 

Today, we're introducing [replay notifications](http://documentation.superfeedr.com/subscribers.html#replaying-notifications). It's a simple API call which will replay one of your subscriptions's notifications. It's fairly simple:

{% prism javascript %}  
$ curl -X GET -ujulien:token 
 https://push.superfeedr.com/
 -d'hub.mode=replay'
 -d'hub.topic=http://push-pub.appspot.com/feed'
 -d'hub.callback=http://requestb.in/owdkpgow'

HTTP/1.1 204 No Content
Date: Mon, 22 Dec 2014 15:56:13 GMT
Connection: close

{% endprism %}  

As always, our goal is to simplify your life if your application relies on RSS feeds. If there is anything we can do, feel free to let us know in the comments.
