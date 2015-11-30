---
layout: post
title: A Google Reader Compatible API
categories: []
---

As we're been providing APIs to build feed readers for years now, last week, we saw a flock of people coming to us and asking if we could help them overcome the disparition of the **Google Reader API**.

### Replacing the Google Reader API

Superfeedr will provide a partial replacement for the Google Reader API by the end of June. We have already started on it an we're confident we can release something quickly. As you may know, the Google Reader API actually consists of two different things:

* The entry and feed data.
* The sync'ing of user state: read/unread, starred, tags, shared items... etc

At this point, we know that we will provide a compatible API for the feed and entry data, but, more importantly, we will **try to backup as much of that data out of Google Reader** for the feeds that our customers have subscribed to.

In other words, our goal is to support all the <code>/reader/atom/</code> prefixed calls, and the params for it, along with the **historical data** served by Google Reader that we will have been able to 'rescue'.

### Syncing the state

Sync'ing state has *never been our core business*, and as we've **built a backend system**, we are not completely sure we will be able to provide the sync layer that many developers would love to see. It will take us a couple more weeks to figure whether we can (or not) provide a replacement for that part of the Google Reader API.

However, we believe this is a less critical aspect, as people tend to stick with the same reader, which means that the sync data can be *local to a given reader*. After all, even Twitter is not able to sync the direct messages you get on different platforms.










