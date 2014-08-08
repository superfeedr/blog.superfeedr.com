---
layout: post
title: "Superfeedr, Hapi & Feedparser"
author_name: Julien
author_uri: http://ouvre-boite.com
author_email_md5: b30ce50678f0e934eaa6697425c59dd7
---

The last couple weeks have been busy with the [redesign](http://blog.superfeedr.com/survey-redesign/). We had to update our venerable Rails 2.3.X app and move to a new Ruby2.0 + Rails 3.2 stack, with Rails 4.0 right around the corner.

However, to keep our sanity, we also worked on a bunch of side project, with Node. 

### Hapi-Superfeedr

[Connect](https://github.com/senchalabs/connect#readme) and [Express](http://expressjs.com/) have long been everyone's favorite HTTP server framework in Node. The last couple months have seen the introduction and growth of a challenger: [Hapi](http://hapijs.com/)! It took us some time, but this week, we dived into it with the goal of *making a Superfeedr plugin* for it.

At first, Hapi's words have been a bit rough to understand: what's the difference between a **pack** a **server** and a **plugin**? But it quickly starts to shine through the expressiveness of the API. a
Making the plugin was eventually quite easy. 

A plugin is nothing more than a **node module** with a `register` method and a couple registration attributes (name, version...). The register method allows the implementer *define routes* specific to the plugin, as well as define what's *explictly exposed* to the plugin user. If you're interested in the process, feel free to read [this issue](https://github.com/hapijs/discuss/issues/1) which shows what questions we asked ourselves and what where the answers provided by the Hapi community.

In the end, the [Superfeedr Hapi plugin](https://github.com/superfeedr/superfeedr-hapi) is very simple: half of the code is used to create a function that sends POST requests to Superfeedr and is not hapi-speficic.

If you're interested in using it, please check [this README](https://github.com/superfeedr/superfeedr-hapi).

### Node-Feedparser

I met with [Dan](http://yabfog.com/blog/) at [Reboot RSS](https://github.com/Reboot-RSS/reboot-rss) and then I promised myself I'd give a shot at his [Node-feedparser library](https://github.com/danmactough/node-feedparser). It's a lirary to handle the parsing of a feed using Node. It does not do diffing, it does not do fetching or scheduling, it just does parsing and it does it very well! As a consequence, it's *very simple to integrate with Superfeedr*.

The Superfeedr-hapi plugin does not do parsing. It will just issue subscriptions and receive data (through webhooks). It becomes then easy to plug node-feedparser like that:

{% highlight javascript %}  
server.plugins.superfeedr.events.on('notification', function(feed_id, payload, url, request) {
  feedparser = new FeedParser({feedurl: url});
  feedparser.write(payload);
  feedparser.on('data', function(data) {
    fs.appendFile('river.html', Mustache.render('<li><a href="{{meta.link}}"><{{meta.title}}></a> {{pubdate}} - <a href="{{link}}">{{title}}</a></li>\n', data));
  });
});
{% endhighlight %}

Each time a new event is sent from Superfeedr, a feedparser instance parses that data and triggers the `data` event for every entry, it then saves them to a `river.html` file.

Node-feedparser does some *normalization* by default, which means that if you use it in your existing feed project and want to switch to Superfeedr for fetching, diffing and scheduling, you will not have any data model change. *Little bits of code working together* is one of Node's most important cultures!




