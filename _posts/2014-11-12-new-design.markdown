---
title: "New Design"
tags: [company, debug, console, design]
---

Today's an historic day: we are [landing on a comet](http://rosetta.esa.int/)! It's also a big day for [Superfeedr](https://superfeedr.com/): our new design is going live.

We're very proud to release this new version of our main HTML applications: it's the biggest change in years and we tried to answer all [your needs and requests](/survey-redesign/).

<img src="/images/new-design.png" alt="new design" title="New Design" style="width:100%">

### Subscriptions

It's now easier than ever to **list** all your subscriptions, **search** for specific ones, but also **get a feed's details**. You can also easily subscribe and unsubscribe from feeds on this new application. It all uses our public *PubSubHubbub API* so anything this does can be done in your very own application!

The subscriptions page is an angular application hooked directly to our API using the [Superfeedr Angular provider](https://github.com/superfeedr/angular-superfeedr).

### Better Consoles

We only hear praises about or docs and this is a great first step, but many of our users also noted that it was not always simple to build requests. We heard them and worked on 2 new consoles which now allow you to manually build requests, see exactly how they look like, as well as inspect responses from Superfeedr. 

They both are angular application. We're especially proud ouf the XMPP console which is a full XMPP client, in the browser, with syntax formatting and highlighting for a more readable XML! It makes great use of [Node-XMPP](https://github.com/node-xmpp) and [Browserify](http://browserify.org/)... but we'll provide more details in the coming days!

### Consistent design and experience

Even though the docs are great, their layout was very different from Superfeedr's main site design. The same went for this very blog. The new design brings an incresed consistency which makes things much clearer for our users:

* [Superfeedr Documentation](http://documentation.superfeedr.com/)
* [Superfeedr Blog](http://blog.superfeedr.com/)


There are *many other things to say about this redesign*... and there are probably small bugs here and there. We'd love to hear what you think. And, before you ask it, this incredible work was done by Chris and Lucas at [Van Patten Media](https://www.vanpattenmedia.com/). Their skills are incredible and it's been an honor to work with them! 

