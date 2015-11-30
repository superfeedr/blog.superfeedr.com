---
layout: post
title: "SubToMe News"
categories: []
---

[SubToMe](https://www.subtome.com/#/) is growing like a weed. It's now triggering more than *500 new subscriptions daily* on the websites that display it.

As it's getting more popular, we're trying hard to make it always better. For those not following the [commits on github](https://github.com/superfeedr/subtome), here is a list of the recent changes:

* adding the service icons on the button
* adding a closing button at the tope right corner (thanks [Mike](http://mahemoff.com/) for the suggestion)
* adding support for a publisher suggested reader
* full offline support through appcache

Let's insist a little bit on that last point.

### Appcache for speed!

There would be no SubToMe if that was not for the numerous HTML5 features. The latest one that we're using is **AppCache**.

As you know, SubToMe is a [fully static application](http://blog.superfeedr.com/subtome-progress/) (no app server involed!). As it's fully static, serving it from "the web" is kind of a waste of time, because the browser will always get the same data. Of course, they can cache some things, but these caches are not very aggressive, because, well the browser really has no way to know that the static files are litterally *never* updated: it'd be awesome of the browser itself could store them itself!

This is what Appcache does. Most people think of it as a mechanism for offline purposes, but it also works when we don't want the browser to make requests to the server! By adding a [simple manifest](https://www.subtome.com/subtome.appcache) file, we're now able to store not only all SubToMe's data in the browser's localStorage, but also all SubToMe's actual "code" in the AppCache store.

The first time a user loads any page on [https://www.subtome.com/#/](https://www.subtome.com/#/), the whole application is cached locally, so that all subsequent requests will be fast and served instantly!

Of course, AppCache is *a bit tricky* and I would definetely recommend you read [that amazing piece](http://alistapart.com/article/application-cache-is-a-douchebag) by [Jake Archibald](http://jakearchibald.com/) if you're about to implement it on your own site! In the meantime, [add the button](https://www.subtome.com/#/publishers) to your own site!



