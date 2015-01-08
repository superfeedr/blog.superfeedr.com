---
layout: post
title: "Superfeedr Jquery"
categories: []
author_name: Julien
author_uri: http://ouvre-boite.com
author_email_md5: b30ce50678f0e934eaa6697425c59dd7
js_includes: ["http://code.jquery.com/jquery-1.10.1.min.js",
"https://raw.githubusercontent.com/superfeedr/superfeedr-jquery/master/superfeedr.jquery.js"]
---

Today, we're happy to introduce the first [Superfeedr Jquery plugin](http://plugins.jquery.com/superfeedr/). It's simple piece of *syntactic* sugar that was aked by one of our customers but makes it really simple to **integrate an RSS feed into a page**!

Its purpose is very simple: integrate a the content of any RSS or Atom feed in any page of your website, without the constraints of the [same origin policy](https://en.wikipedia.org/wiki/Same_origin_policy). It's very useful in the context of javascript *single page applications* for example or in the context of *full client side javascript applications* without any server side code, like the kind of apps that runs on [FirefoxOS](http://www.mozilla.org/en-US/firefox/os/) or [ChromeOS](http://www.chromium.org/chromium-os).

### Example

The list of posts below is loaded using the following script (check the source! if you don't trust me!).

<ul id="feed">
</ul>

{% prism javascript %}  
$(document).ready(function() {
  $.superfeedr.options.login = 'superfeedr';
  $.superfeedr.options.key = '1a8c661804873703802212503e75d3c2';

  var feed = new $.superfeedr.Feed('http://blog.superfeedr.com/atom.xml');

  feed.load({count: 5}, function(result) {
    if (!result.error) {
      var container = $("#feed");
      for (var i = 0; result.feed.items.length > i ; i++) {
        var entry = result.feed.items[i];
        $("#feed").append($('<li>' + entry.title + '</li>'))
      }
    }
  });
});
{% endprism %}

<script type="text/javascript">
$(document).ready(function() {
  $.superfeedr.options.login = 'superfeedr';
  $.superfeedr.options.key = '1a8c661804873703802212503e75d3c2';

  var feed = new $.superfeedr.Feed('http://blog.superfeedr.com/atom.xml');

  feed.load({count: 5}, function(result) {
    if (!result.error) {
      var container = $("#feed");
      for (var i = 0; result.feed.items.length > i ; i++) {
        var entry = result.feed.items[i];
        $("#feed").append($('<li>' + entry.title + '</li>'))
      }
    }
  });
});
</script>

The ticker on our [home page](http://superfeedr.com) uses the plugin if you're looking for another example too!

## Final notes

We believe this is an elegant **replacement** to the [Google Feed API](https://developers.google.com/feed/). Try it out and let us know what you think. It's also [on Github](https://github.com/superfeedr/superfeedr-jquery) and you're more than welcome to ask for more features, fork or submit pull requests. There is a also a small guide on how to get started quickly.
