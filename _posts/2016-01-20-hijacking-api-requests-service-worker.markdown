---
title: "Hijacking API requests with Service Workers"
description: "The data consumed in a feed reader is updated often. Yet, for the best experience, we want to also serve the cached data."
tags: [feed api, html5, offline, serviceworkers]
js_includes: []
image: "/images/offline.png"
---

[Last week](/service-workers/), we've seen how to add a Service Worker to [our feed reader](https://river.news/) so that it loads faster by caching its *shell*. One of the direct benefits of this is that our application shell is now also **available offline**, even when the browser is not connected to the web.

This week, we'll see how we should also use the Service Worker API to cache the dynamic data coming from the [Superfeedr Feed API](https://superfeedr.com/).

## Service Worker Toolbox

Our shell is now cached immediately after the first visit to [River.news](https://river.news). After this, the content of the shell (static HTML, CSS and javascript) are *always* loaded only from the cache. (until of course we update the service worker).
The RSS feeds' content will be updated more often, so we can't use the same approach for the calls to Superfeedr's API. Yet, we still want the best experience so we have to cache the content and show it to the user immediately. In a way, for each call to the API, we want to achieve 2 things at **concurrently**:

* If there is any data in the cache, show that to the user
* Make a request to Superfeedr's API and fail silently if the application is offline.

That's a pretty common scenario in the [Offline Cookbook](https://jakearchibald.com/2014/offline-cookbook/) published by [Jake Archibald](https://twitter.com/jaffathecake). As a consequence, Google implemented it in its [sw-toolbox](https://github.com/GoogleChrome/sw-toolbox) (`sw-toolbox` is syntactic sugar on top of Service Workers, exactly like [sw-precache](https://github.com/GoogleChrome/sw-precache). The scenario we described above is called `fastest`.

`sw-toolbox` provides a routing mechanism which hijacks all HTTP requests performed by the browser and applies any of the predefined recipes in the toolbox. Here's the code we're using for River.news:

{% prism javascript %}

toolbox.router.get(/^https:\/\/push.superfeedr.com\//, toolbox.fastest);
toolbox.router.get(/^https:\/\/www.google.com\/s2\/favicons/, toolbox.fastest);
toolbox.router.get(/^https:\/\/river.news\/up.html/, toolbox.networkOnly);

{% endprism %}

We see that for any request which matches the `/^https:\/\/push.superfeedr.com\//,` regular expression, we apply the `toolbox.fastest` recipe. We use the exact same approach for requests to `google.com/s2/favicons` that we use to load the icons for each story.

The last line is a bit different. We *only* want to load this last resource using the network and never cache it.

## Assessing connectivity

Caching data is extremely useful when the application **only has to display** information. However, if the local application needs to alter the data, caching can quickly turn into an engineering nightmare with race conditions, lost updates and more. Luckily for us, a feed reader is mostly about *consuming* data and rarely about *altering* it. The notable exception being that one might want to update their subscription list. To make things simpler, at this point, we want to disable any change to the subscription list while the application is offline.

> HTML5 has its own [Network Information API](http://w3c.github.io/netinfo/). Not only is it [barely implemented](http://caniuse.com/#feat=netinfo), it also fails to detect when the device on which our application is connected to a network, but not to the web.

In order to check if we can update our subscription list, the River.news application will just make a simple `HEAD` request to [`http://river.news/up.html`](http://river.news/up.html). If the request fails, we assume that we're offline and then disable the form fields. If it succeeds we can let the user add or remove feeds.

The latest rule of our `sw-toolbox` should now make sense: we cannot afford to cache the responses if we want to reliably detect when we are offline!

There are *many* other use cases to Service Workers. For example, in our feed reader, we could use Service Workers to white-list a set of 3rd party javascript script.




