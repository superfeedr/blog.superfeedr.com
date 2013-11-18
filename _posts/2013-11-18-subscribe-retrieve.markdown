---
layout: post
title: "Susbcribe and Retrieve"
categories: []
author_name: Julien
author_uri: http://ouvre-boite.com
author_email_md5: b30ce50678f0e934eaa6697425c59dd7
---

Do you know what has been the oldest Superfeedr *feature request*? 
It's the ability to [subscribe](http://documentation.superfeedr.com/subscribers.html#addingfeedswithpubsubhubbub) and [retrieve](http://documentation.superfeedr.com/subscribers.html#retrievingentrieswithpubsubhubbub) a feed in one single call.

Basically, up until now, when your app needed the content of a feed from Superfeedr, you first had to subscribe to the feed and then wait for us ot send you all the next, upcoming entries. It was not the best experience for users who may want to quickly have a "visual confirmation" of what's the previous content in a feed. For many of our customers that meant that they had to themselves fetch the feed first. 

### Susbcribe and retrieve

One of the goals of our most recent deployment was to bring the users closer to our backend. This means that it's now possible to combine our *frontend API* (the one that gets your requests), our *cave storage* (in which we store the past content of feeds) and our *fetchers and parsers* (just in case the feed has not yet been added to Superfeedr).

It's as easy as adding a simple <code>retrieve</code> parameter to your POST request. 

<script src="https://gist.github.com/julien51/7531368.js">
</script>

Of course, the data will be returned as JSON if you've added the <code>format=json</code> or the <code>Accept: application/json</code>

This way, your applications won't even have to fetch the original feeds and you can just *blindly* subscribe to any feed with Superfeedr.
