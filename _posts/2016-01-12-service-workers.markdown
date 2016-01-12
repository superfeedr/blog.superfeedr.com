---
title: "Adding Offline Support to a feed reader with Service Workers"
description: "Feed readers are more useful when they work offline. Unfortunately, up until a couple months ago, the web’s technologies were not compatible with this requirement. Yet, the introduction of Service Workers is slowly changing this game and, at Superfeedr, we’re excited to see open web technologies catch up with capabilities of installable native apps."
tags: [feed api, html5, offline, serviceworkers]
js_includes: []
image: ""
---

Feed readers are more useful when they **work offline**. Unfortunately, up until a couple months ago, the web's technologies were not compatible with this requirement. Yet, the introduction of [Service Workers](http://www.w3.org/TR/service-workers/) is slowly changing this game and, at [Superfeedr](https://superfeedr.com), we're excited to see open web technologies catch up with capabilities of installable native apps.

We have our very own RSS reader built on top of Superfeedr's API: [river.news](https://superfeedr.com). Let's see what Service Workers can do for it and improve our code. As a reminder, this is a **static single page application**: there's no application server which computes a different response for each request. Check the [source code](https://github.com/superfeedr/river.news) on Github.

## Service Workers

Dozens of [great](https://changelog.com/must-watch-videos-service-workers/) [resources](https://changelog.com/essential-reading-list-for-getting-started-with-service-workers/) online provide excellent definitions and introductions to Service Workers. To us, it's a *very significant upgrade to the web's core philosophy*. The web's center is the [HTTP protocol](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol) which stands for **H**yper**T**ext **T**ransfer **P**rotocol. Literally, this means our browsers are communicating with servers to receive **hyper-text document**: the web pages. Later, these documents may load Javascript code which is finally executed. With ServiceWorkers, the **order changes**: some javascript code can be executed *before* anything else happens. These workers can then hijack HTTP request (and more) and provide alternative (or fallback) responses.

Adding support to river.news would be very interesting on 2 levels:

* Since the code is static, there's *no need* to load it from the file server after its first load. [SubToMe](https://subtome.com) used AppCache for this.... but AppCache [is so messy](http://alistapart.com/article/application-cache-is-a-douchebag).
* When loading past stories from Superfeedr, we should keep them in the cache so that the user can read them even when they go offline or have a spotty connection.

## An application shell

Most web applications have a **base template** which is made of some HTML, CSS and Javascript used all across the application, even if there are multiple HTML pages. This **application shell** should absolutely be cached by the browser so that it stays in memory. There should be no latency spent downloading it because it rarely changes.

In the case of [river.news](https://river.news), it's actually fairly simple: there's just a *single HTML page*. There's also a single javascript file for the application's specific code. Since we use React and Jquery as dependencies, we consider them as part of the basic shell for our application. We also use Bootstrap's CSS, so we'll add it to the shell, as well as a bunch of icons.

The application's shell must immediately be cached the first time the page is loaded and we should only invalidate the cache for the files that have changed (incremental updates are much better than native apps!). Even though the Service Worker API is fairly simple, the Chrome team provides some syntactic sugar in the form of [`sw-precache`](https://github.com/GoogleChrome/sw-precache). This script lets anyone quickly define the files required for the shell and handles invalidation without **any significant code change** to your own code!

That was the easy part. Next week, we'll see how we can also cache the API calls to Superfeedr for offline usage!



