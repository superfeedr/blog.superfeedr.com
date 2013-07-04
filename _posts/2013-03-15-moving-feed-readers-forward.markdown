---
layout: post
title: Moving RSS forward
categories: []
author_name: Julien
author_uri: http://ouvre-boite.com
author_email_md5: b30ce50678f0e934eaa6697425c59dd7
---

The death for Google Reader will surely bring a gigantic wave of innovation in the RSS Reader 'market'. We've shown yesterday that [there are many many alternatives](http://blog.superfeedr.com/state-of-readers/). Superfeedr is **in the business of making RSS easier**, we're introducing a little, simple ([baby step](http://www.marco.org/2013/03/14/baby-steps-replacing-google-reader!) thing which we hope will make a subscribing easier to use for everyone.

### Subscribing is hard

We've heard a lot of people say that they *replaced their RSS reader with Twitter, or Facebook*. It's also possible that Google killed Reader to promote G+. These platforms are popular for news reading because it's so easy to subscribe or follow news sources, or people sharing the blogs... etc. **It's just a click of a button**.

Subscribing to an **RSS feed is still very hard**. When I am on a site I like, I have to find the RSS link (which is often hidden), copy its url, open a new tab and paste the url in he right field. Finally, I can click on the 'subscribe' button. 

> UPDATE; people on HackerNews said that subscribing to an RSS feed is easy. Check this video of how people react when they're asked [what a browser is](http://www.youtube.com/watch?v=o4MwTvtyrUQ).

### Meet SubToMe

[SubToMe](https://www.subtome.com/) aims at simplifying that. It's a button, click on it: <input type="button" id='followThis' value="Follow this Blog" />

<script>
(function(){
  window.onload = function() {
    document.getElementById("followThis").onclick = function() {
    var z=document.createElement('script');
    z.src='https://www.subtome.com/load.js';
    document.body.appendChild(z);    
  }
}})()
</script>

If all goes well, you should see something like this: 

<img src="https://raw.github.com/superfeedr/subtome/master/misc/subtome-screenshot.png" alt="Msgboy" style="margin: 10px">

Of course, that's kind of dumb you may think. This is just a list of readers and it'll be hard to list them all. Luckily, this button has a [registration mechanism](https://www.subtome.com/developers.html). For example, click on <a href="https://www.subtome.com/register.html?name=Feedly&amp;url=http%3A%2F%2Fwww.feedly.com%2Fhome%23subscription%2Ffeed%2F%7Bfeed%7D" target="_blank">use Feedly</a> or <a target="_blank" href="https://www.subtome.com/register.html?name=Bloglovin&amp;url=http://www.bloglovin.com/search/%7Burl%7D">Use Bloglovin</a>, and eventually, click again on the button above.

You should now see only the services for which you have been registered. Of course, this should be *100% transparent to the user*, using iframes, like [The Old Reader](http://theoldreader.com/) already does! This way, **each user will be able to use their favorite reader** and publishers don't have to put dozens of *follow me on xxx* buttons on their sites.

Of course, you may wonder how this is done. Here is a little secret: it's all stored in <code>localStorage</code>. All the SubToMe files are just static HTML files. No server involved, no app running and no data is ever leaked. 

We also have a [bookmarklet and browser extensions](https://www.subtome.com/settings.html) for you to subscribe easily.

### Do you have a blog?

If you do, you probably understand the need for you to **control the distribution of your content**. You just can't rely on Twitter, Facebook or Google+ to send your content to your subscribers and followers.

Make sure you pick a platform that has RSS feeds and make sure you allow people to subscribe to your content in the easiest possible way. Follow these instructions if you want to [add a SubToMe button](https://www.subtome.com/publishers.html).

We have a [SubToMe Wordpress extension](http://wordpress.org/extend/plugins/subtome). Install it!














