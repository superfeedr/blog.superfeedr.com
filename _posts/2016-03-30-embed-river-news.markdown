---
title: "Embed and customize River.news "
description: "River.news is a very basic feed reader which can be embedded on any we page"
tags: [openweb, reactjs, static, reader]
js_includes: [
'//cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0-alpha1/jquery.min.js',
'//cdnjs.cloudflare.com/ajax/libs/react/0.13.3/react.min.js',
'https://river.news/js/river.news.min.js'
]
---

The [superfeedr feed API](https://superfeedr.com/) is quite powerful and lets anyone build any kind of application which consumes RSS feeds, whether it's on the web, a mobile application, or processed on the server side. Building and maintaining servers is not always trivial, which is why more and more applications are built to be server-less. This is the case of our [river.news](https://river.news) app. We recently updated it and here's a breakdown of what it does.

Not only you can use [River.news](https://river.news) on its own domain, but you can also effortlessly embed on any HTML page... [like this one](#rivernews):

## Offline: Service Workers

If you read this blog often, you've already seen that [we added offline support to river.news](https://blog.superfeedr.com/service-workers/). Service Workers are completely changing the web from a document-oriented architecture (HTML pages are loaded first) to an **application-oriented architecture** with javascript executed even before HTTP requests are fired.

## Better styling

Recently, we centralised all of our styling assets on [assets.superfeedr.com](https://assets.superfeedr.com/). The fantastic team at [Van Patten Media](https://www.vanpattenmedia.com/) did an amazing work to group, document and simplify all the assets used by Superfeedr. Our river.news now uses these assets by default. Also, since we use the bootstrap classes, including Bootstrap's CSS will yield a nice looking style to your instance of river.news!

## Customisable

Finally, the most recent version of river.news lets you hard-code a login and token. You can also prevent the visitor from changing the subscription list. For example, the river embedded above has disable the ability to enter a superfeedr login and password, as well as the ability to subscribe to new feeds. The configuration happens in the DOM, with `data-attributes`.

There's a lot more to do! What features are important to you in an embeddable feed reader?

<div id="rivernews" data-superfeedr-login="superfeedr" data-superfeedr-token="1a8c661804873703802212503e75d3c2" data-disable-settings data-disable-subscriptions ></div>
