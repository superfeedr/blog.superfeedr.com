---
layout: post
title: "PubSubHubbub for Drupal with multiping"
author_name: Pelle
author_uri: http://voxpelli.com/
author_email_md5: 0b6a41604162fdc38846fb002274ae4c
description: "Multiping is a Drupal module which enables PubSubHubbub on any Drupal site."
tags: [drupal, PubSubHubbub, ping, opensource]
image: "/images/drupal-8.png"
js_includes: []
---

[Drupal](https://www.drupal.org/) has many strengths. You can build pretty powerful websites through very little custom code. So far though, if you’ve wanted that pretty powerful website to not be all alone in its own corner of the internet but instead be a bit more chatty with the rest of the web, then your options have been slim.


This hasn’t always been the case. Back in the day Drupal 6 even came with a built in module to send pings to notify the outside world about what happened inside of it. But it was very basic and the Ping module was removed in Drupal 7, partly because other more capable modules was on the rise. In the end though – none of those modules ever matured, so Drupal has been pingless for many years now.


<img src="/images/drupal-8.png" style="float:left; width: 200px; margin-right: 10px" />

But that’s about to change. One of the modules from the past is now making a reappearance. [Multiping](https://www.drupal.org/project/multiping) is back, and as you can imagine from the context of this blog post – it’s bringing new shining **Pubsubhubbub**-backed pinging technology to the table, along with other sparkling new features.

Drupal, by the nature of being a *build-pretty-powerful-websites-through-very-little-custom-code* system, makes it a bit harder to make a powerful pinging solution for it than it is to do the same for eg. a blog engine that has a more limited and predetermined number of feeds to ping for. In Drupal even there are a few feeds provided by default, most sites override them with their own to get a fully custom solutions. Any pinging solution for Drupal therefore needs to support pinging for not just a predetermined set of feeds, but for any feed.

Therefore the new version of Multiping doesn’t just come with exciting new [Pubsubhubbub](https://en.wikipedia.org/wiki/PubSubHubbub) pinging capabilities – it also comes with a *new advanced* [Views](https://www.drupal.org/project/views) integration that aims to make Views more realtime. Ever wanted consumers of your news to be notified as soon as you post a new story? Simple. Just activate the new Ping setting in your your Views News Feed display, point it to a Pubsubhubbub **hub** (feel free to use a [Superfeedr hosted hub](http://superfeedr.com/publisher/) !) and you’re done.

On top of the new Views features and Pubsubhubbub pinging the new version also provides exportable configurations and plenty of ways to extend it – so it’s an allround new fresh take on pinging for Drupal, that provides plenty of things for others to leverage to their liking.

So – exciting stuff and hopefully something that will make it easier for Drupal sites to start chatting with the rest web and tell them, in realtime, that something has happened that they someone else should take notice of. Realtimeness and notifications has become essential parts of our day to day life and bringing Drupal closer to that day to day reality will make already powerful sites even more powerful.

If you want to try out these new features, then [download the new fresh Multiping 7.x-2.0-alpha1 release](https://www.drupal.org/project/multiping) and leave feedback and input in the issue queue to let us know what you think!