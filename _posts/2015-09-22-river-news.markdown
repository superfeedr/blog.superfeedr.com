---
title: "River.news"
description: "A RSS River is the perfect use case for us to build a fully static application which uses React.js and Superfeedr's API. That's what we did: here's http://river.news."
tags: [openweb, reactjs, static, reader]
js_includes: [
'//cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0-alpha1/jquery.min.js',
'//cdnjs.cloudflare.com/ajax/libs/react/0.13.3/react.min.js',
'https://river.news/js/river.news.min.js'
]
---

When we started investigating [React](https://facebook.github.io/react/), we were looking for a side project for which we could use both React and [Superfeedr's API](http://push.superfeedr.com/). This had to be an *RSS reader*. One of the aspects of the modern web we're really fond of is the ability to build rich application *without* an app server... **only using static files**.

A **RSS River** is the perfect use case for us to build a fully static application which uses React.js and Superfeedr's API. That's what we did: here's [river.news](https://river.news/).

Ha! Do you know what's amazing? Since it's just static files (just Javascript, CSS and a simple `<section id="content"></section>` HTML line), you can embed this river of news on *any web page* very easily. Check it by yourself:

<style>
.img-responsive {
	max-width: 100%;, height: auto; display: block;
}
</style>

<section id="content"></section>

### In the browser

Since it run on *your user agent*, it can show the feeds to which *you* are subscribed... and only to you! It actually stores a Supefeedr login and token in your browser's localstorage. Open a [Superfeedr susbcriber account](https://superfeedr.com/subscriber/), head to [river.news](https://river.news/) (or to any page which includes it, really!), enter your credentials and start subscribing!

### And it's realime!

React makes it really simple to build complex front applications which multiple views and dynamic elements. Since it's so simple to integrate [Server-Sent Events with React](/react-server-sent-events/), if the feeds to which you subscribed are [PubSubHubbub](https://en.wikipedia.org/wiki/PubSubHubbub) enabled, the reader will show new story within seconds of their publication time!

Want to learn more about how to use it or embed it? Check the [README](https://github.com/superfeedr/river.news/blob/master/README.markdown)!




