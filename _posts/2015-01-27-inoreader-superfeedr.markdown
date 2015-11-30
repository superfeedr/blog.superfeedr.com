---
layout: post
title: "Inoreader: Super-charge your RSS with Superfeedr"
js_includes: []
tags: [publisher, pubsubhubbub, inoreader]
---

> The following is a blog post written by Yordan from Innologica, the company behind Inoreader. If you want to write a guest post, please get in touch!

![Inoreader](/images/inoreader/inoreader-banner.jpg)


[Inoreader](http://www.inoreader.com) is well known for its Power-user-friendly features. People love the usefulness of **rules**, **active searches**, **tags**, **broadcasts** and a lot more. Those features allow you to go beyond just consuming content in your RSS reader. They allow you to control it, organize it and export it to different channels.

One of those channels is RSS (duh). You can feed those RSS feeds to any other reader, software or even devices that support it. That's the nature of RSS, to be simple, yet effective way to transport updates between services.

Now Inoreader gives you lightning fast RSS updates, as we now support [PubSubHubbub](https://code.google.com/p/pubsubhubbub/) for exported RSS feeds through our [Superfeedr hub](http://inoreader.superfeedr.com/). This means you can use feeds for your tags, active searches and everything else you create in Inoreader and together with [Superfeedr](https://superfeedr.com/) we’ll speed them up for you. You will receive updates instantly, provided the client you use also utilizes [PubSubHubbub](https://code.google.com/p/pubsubhubbub/). This addition will also make a big difference if you are automating stuff via providers like [IFTTT](https://ifttt.com/).


But why is this needed? Traditionally, RSS was not designed to be a real-time protocol. The client should periodically check the RSS feed for any updates. We'd cal this "sub-optimal", wouldn't you?

This is where [Superfeedr](https://superfeedr.com/) steps in. It's a service that utilizes the [PubSubHubbub](https://code.google.com/p/pubsubhubbub/) (and [XMPP](http://xmpp.org/), but we're not going to talk about it today) protocol. We will not go into detail about the implementation right now, there's plenty of [documentation](https://pubsubhubbub.googlecode.com/git/pubsubhubbub-core-0.4.html) online and even cool videos like this one:

<iframe width="700" height="395" src="//www.youtube.com/embed/B5kHx0rGkec" frameborder="0" allowfullscreen></iframe>

Here's how to get your RSS feed for an active search for example.


1. Right-click on your active search and click `View search information`:

![Inoreader](/images/inoreader/inoreader-settings.png)

2. Click the `Export off` switch to turn on the export and to get your RSS link:

![Inoreader](/images/inoreader/inoreader-export.png)

3. All other feeds can be enabled in `Preferences -> Folders and tags`:

![Inoreader](/images/inoreader/inoreader-list.png)

[Superfeedr](https://superfeedr.com/) powered feeds are available to all users (Basic, Plus and Professional) and all feeds except folders. We hope you'd find RSS to be even faster than before and you'll get even more out of [Inoreader](http://www.inoreader.com)!

--
The Innologica team

