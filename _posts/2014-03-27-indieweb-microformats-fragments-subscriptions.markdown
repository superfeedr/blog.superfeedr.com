---
layout: post
title: "IndieWeb: fragment subscriptions to microformats"
author_name: Julien
author_uri: http://ouvre-boite.com
author_email_md5: b30ce50678f0e934eaa6697425c59dd7
js_includes: ["https://www.embedcurl.com/embedcurl.min.js"]
tags: openweb, indieweb, fragments
---

In the past couple weeks, the [IndieWeb](http://indiewebcamp.com/) crowd got a lot of attention. This is a very good news, because we strongly believe **the web needs more diversity** and the indieweb movement is clearly a step in that direction.

Yet, the current [POSSE](http://indiewebcamp.com/POSSE) culture, as well as a strong biais against RSS/Atom feeds means that this community currently relies on silos for the it's *following* features. Pragmatically, **most of the actors there provide RSS or Atom feeds**, though, but they seem to put more effort into crafting their microformated HTML.

That's not a problem, because Superfeedr obviously can deal with that very well too, thanks to our [fragment subscriptions](http://documentation.superfeedr.com/subscribers.html#htmlfragments), and here this is a perfect example to illustrate how it works. We're basically re-using the `#` element of topic URLs to indicate which part of an HTML page you're subscribing to.

Let's pick [Barnaby's blog](http://waterpigs.co.uk/notes/). His site has a nice layout and a lot of interesting navigation items, but what I'm really interested in knowing is actually the entries (`h-entry` in [h-feed](http://microformats.org/wiki/h-feed) speak) he publishes. So, rather than subscribing to the whole HTML document (Superfeedr would allow that), I will subscribe to the entries using this topic URL: `http://waterpigs.co.uk/notes/#.h-entry` (basically, the fragment is the CSS path of the content to which I want to subscribe on the page).

For the sake of this example, I have indeed subscribed to Barnaby's site and used a [Runscope](https://www.runscope.com) [capture](https://www.runscope.com/docs/request-capture) to log the requests. It's as easy as this:

<pre width="100%" class="embedcurl" title="Subscribe to microformats">curl -X POST -ujulien:paSsWOrD https://push.superfeedr.com -d'hub.mode=subscribe' -d'hub.callback=https://n6ygb81xcek3.runscope.net' -d'hub.topic=http://waterpigs.co.uk/notes/#.h-entry' 
</pre>


The notification includes the HTML content that has an `h-entry` class. Of course, I could have used a more complex CSS expression if I wanted a more specific item.

For this, and because Barnaby's blog is not (yet?) PubSubHubbub enabled, you'll need a [Superfeedr subscriber account](http://superfeedr.com/subscriber), but next, we'll show you how you can also **enable PubSubHubbub on your IndieWeb site** so that anyone can subscribe to your microformatted content in your [indieReader](http://waterpigs.co.uk/notes/4T3FSd/) (as well as your RSS/Atom feeds) :)


