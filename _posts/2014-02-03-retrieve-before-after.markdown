---
layout: post
title: "Retrieve Before or After"
categories: []
author_name: Julien
author_uri: http://ouvre-boite.com
author_email_md5: b30ce50678f0e934eaa6697425c59dd7
tags: retrieve, http, feed api
---

As you know, we've invested a lot recently in our retrieve API (see the [jquery plugin](http://blog.superfeedr.com/jquery-superfeedr/) and [subscribe & retrieve](http://blog.superfeedr.com/subscribe-retrieve/). This API allows you to **retrieve the past** content from any feed, based on what Superfeedr stored of it. It's an easy way to *bootstrap* your application with historic data before you start getting new entries.

Today we're introducing a small addition to this API: the <code>before</code> and <code>after</code> params. They allow you to paginate over past entries by getting the ones that have been published **before** or **after** one that you've identified.

The value that you have to pass is the `id` of a entry which was previously published in the feed.

Try it out by typing the following into your shell:

{% prism shell %}
$ curl -X GET https://push.superfeedr.com/ 
  -udemo:demo 
  -d'hub.mode=retrieve' 
  -d'hub.topic=http://push-pub.appspot.com/feed'
  -d'format=json' 
  -d'count=10' 
  -d'after=http://push-pub.appspot.com/feed/4045001'
{% endprism %}

### Staying in Sync

The most important benefit of this new feature is to make sure your client *did not miss any data* and yet be able to quickly retrieve whatever data could have been missed.

Let's imagine your application goes down for a couple minutes or hours. When it comes back up, it will start getting notifications again. At this point, for each feed with a notification, you're able to send a request to get the entries published `before` the one you just received. You could also keep track of the latest id you received for each feed and use the `after` param accordingly.

Let us know what you think!




