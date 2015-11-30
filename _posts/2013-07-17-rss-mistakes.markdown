---
title: "RSS: let's not do the same mistakes"
---


With Google Reader gone and the recent privacy scandals, millions of faithful readers are now looking for alternatives **to follow** content. Meanwhile, hundreds of thousands of publishers are anxious about gaining subscribers - and control over the subscriptions which have been delegated to Twitter, Facebook or Google+. Luckily, dozens of new readers have been announced or launched.


### Copycats won't grow the pie

RSS is dead has been the motto of several tech publications (none of whom actually deleted their feeds... but that's another story!). The truth is these people were right in the sense that RSS has seen *very little innovation*, because one player was incredibly dominant and no-one could really distinguish from it. Now, that player is gone, but if we only use new readers who provide the same experience, we're probably not going to see this ecosystem explode again.

Yet, there are so many ways to consume feeds: *Email subscriptions* have been massively pushed by Wordpress for example, [RSS recipes on IFTTT](https://ifttt.com/recipes/search?q=RSS) also provide innovative alternatives. Did you know that [Flipboard](https://flipboard.com/) also relies heavily on RSS to show you content in a beautiful magazine format?

These are non-google-reader-like experiences: let's get more of these to make the e**cosystem stronger and more resilient**.

### Subscribing is hard

Most popular blogs have links to both a Twitter account and an RSS feed. Say I want to subscribe using both tools:

* For Twitter, it's as easy as clicking the Twitter icon and hitting the follow button: done.

* For RSS, I have first to "guess" (or rather hope) that there is a feed, since browsers now hide the infamous orange icon. I can then select the url of that tab and copy it. Then, open a new tab, go to the reader I chose to use and paste the url. Hopefully, that reader is smart enough to actually find the feed url from this page's url. If not, I'm screwed anyway and I'll have to look into the HTML code of the page! 


The latter is **too complex**. Once you factor in that many people have no idea what a feed is, what a url is, or even how to open a new tab. (which is evident after [you've seen this](http://www.youtube.com/watch?v=o4MwTvtyrUQ)), it's quickly clear that only nerds can be expected to use feed readers in their current form.

What if we could provide a simple *follow* button that does the hard job of getting the right content and smartly sending it to their favorite feed-reading tool? We would probably see more adoption for readers, more subscribers to blogs or news sites, and a generally **more informed internet**.

As a matter of fact, this button exists, and it's called [SubToMe](https://www.subtome.com/#/). It's easy to install and works with most feed readers in a very simple and elegant way. If you have a blog, give it a try! (you can click on it at the bottom of this post too!)

### Polling XML sucks

Finally, (and this is the nerdiest part!), we can improve the way feed readers get content for their subscribers. 

The "level 0" solution is to periodically *fetch each feed, parse it, diff it and hopefully find something new*. This is a huge waste of resources for the publishers and the subscribers as updates are not that frequent for most sites anyway. Unfortunately, decreasing the frequency also means a delay in content and is not acceptable either.

Open web solutions exist, like [PubSubHubbub](http://en.wikipedia.org/wiki/PubSubHubbub) or [RSSCloud](https://en.wikipedia.org/wiki/RSS_Cloud): they just allow for updates to be pushed from the publisher to the subscriber in an elegant way without wasting resources.

The cherry on the cake? [PubSubHubbub evolved](http://blog.superfeedr.com/pubsubhubbub-0-4/) and is now able to work with any kind of data (not just RSS or Atom), **opening the door to a JSON based syndication format**. Of course, this will only happen if all publishers (big and small) agree on a common format to avoid the waste of creating custom consuming application for each of them.

Do you see other traps for the RSS ecosystem?

