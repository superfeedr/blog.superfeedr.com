---
layout: post
title: "Retrieving Multiple Feeds"
author_name: Julien
author_uri: http://ouvre-boite.com
author_email_md5: b30ce50678f0e934eaa6697425c59dd7
js_includes: []
tags: retrieve, callback, search, feed api
---

You're probably familiar with our [retrieve by feed](http://documentation.superfeedr.com/subscribers.html#retrieving-entries-with-pubsubhubbub) API which lets you retrieve past content from a feed quite conveniently:

{% prism bash %}
curl -D- -G https://push.superfeedr.com/ \
  -d'hub.mode=retrieve' \
  -d'hub.topic=http://push-pub.appspot.com/feed' \
  -d'format=json' \
  -u'demo:27628f5c4ef62fad902dce4be789d1d7' 
{% endprism %}

One of the great features of this API is the ability to *stream* upcoming new entries from a feed. This also applies to web pages, via our [Server Sent Events](http://blog.superfeedr.com/server-sent-events/) endpoint. 

Many of our customers are subscribed to several feeds and some of them asked us if it was possible to retrieve multiple feeds at once, instead of issuing one request per feed. From now on, yes, it is possible! 

The *base* call is fairly similar to the one you'd use to retrieve by resource:

{% prism bash %}
curl -D- -G https://push.superfeedr.com/ \
  -d'hub.mode=retrieve' \
  -d'hub.callback=http://my.webhook.com/path' \
  -d'format=json' \
  -u'demo:27628f5c4ef62fad902dce4be789d1d7' 
{% endprism %}

The most notable difference, of course, is that this will yield the last entries accross all feeds which are subscribed with the endpoint `http://my.webhook.com/path`. 

Since it is considered bad practice to use the same callback URL accross multiple feeds, this API call would be probably useless if it only allowed to match the exact callback URL. Luckily, rather than the full callback URL, you can also use a *search query* which will match various subscriptions and returns the corresponding entries. For example, you could use something like this:

{% prism bash %}
curl -D- -G https://push.superfeedr.com/ \
  -d'hub.mode=retrieve' \
  -d'hub.callback[endpoint][hostname]=my.webhook.com' \
  -d'format=json' \
  -u'demo:27628f5c4ef62fad902dce4be789d1d7' 
{% endprism %}

This request will yield past entries from feeds to which the *demo* user is subscribed using a callback on the domain `my.webhook.com`. 

And to make things even better, our [streaming API](http://documentation.superfeedr.com/subscribers.html#streaming-rss) applies to this as well, include **Server-Sent Events**!




