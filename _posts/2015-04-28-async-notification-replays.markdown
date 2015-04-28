---
layout: post
title: "Async Notification Replays"
author_name: Julien
author_uri: http://ouvre-boite.com
author_email_md5: b30ce50678f0e934eaa6697425c59dd7
js_includes: []
---

Last week, we blogged about [agregating RSS feeds in a Rails](http://blog.superfeedr.com/consuming-rss-feeds-rails/) application. Ruby On Rails is one of these frameworks which **integrates very well with Superfeedr**. However, Rails has a very annoying feature in development: *it can only handle one single request at a time*.

This is annoying because when you submit requests to Superfeedr which callback to your webhook, you can't do it *from* your Rails application, because Superfeedr will issue a request back to your Rails application... which would be unable to respond to it, because it's busy responding to yours.

For this very reason, you can use `hub.verify` with both `sync` and `async` values. Today we're also adding `async=true` when [replaying a request](http://blog.superfeedr.com/replaying-notifications/).

Basically, Superfeedr will respond to your request *before* replaying the notification. 

Here's an example:

{% prism bash %}
curl https://push.superfeedr.com/ 
  -G 
  -u demo:demo 
  -d'hub.mode=replay' 
  -d'async=true' 
  -d'hub.topic=http://push-pub.appspot.com/feed' 
  -d'hub.callback=http://mycallback.tld/ok'
{% endprism %}

