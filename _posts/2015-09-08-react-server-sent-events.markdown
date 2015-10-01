---
layout: post
title: "React and Server Sent Events"
author_name: Julien
author_uri: http://ouvre-boite.com
author_email_md5: b30ce50678f0e934eaa6697425c59dd7
js_includes: []
description: "Integrating Server-Sent Events in React is trivial. Here's an example."
tags: [reactjs, static, feed api, server-sent-events, eventsource, stream]
---

[React](https://facebook.github.io/react/) is an open-source javascript framework for creating user interfaces. At Superfeedr, we already use it for a bunch of internal tools and projects to be released. A couple of months ago, we also released [Reader News](https://readers-ne.ws/) which is a **river of news** style feed reader. For this example, we subscribed to the blogs of several feed readers.

Today, we decided to revisit this simple application and add some realtimeness to it so that the interface auto-updates when new feed items are added. For this, we'll use Superfeedr's [Server Sent Event interface](/server-sent-events/).

Currently, this React application uses [Superfeedr's Jquery plugin](/jquery-superfeedr/) to fetch the data upon page load. We need to chage this has Jquery's `$ajax` call does not support Server Sent Event. Also, Server Sent Event's API is actually very simple: we don't need to use syntactic sugar.

Let's create a function which connects to the EventSource endpoint[^1][^2]:

{% prism javascript %}

function loadContent() {
    var that = this;
    var url = "https://stream.superfeedr.com/";
    var query = {
      'count': 5,
      'hub.mode': 'retrieve',
      'authorization': btoa([this.state.login, this.state.token].join(':')),
      'hub.callback': 'https://push.superfeedr.com/dev/null'
    };
    url = [url, serialize(query)].join('?');
...
{% endprism %}

We build the Superfeedr URL with the right query string:

* Using the [`retrieve` mode](http://documentation.superfeedr.com/subscribers.html#retrieving-entries-with-pubsubhubbub),
* for 5 elements
* with the [right authorization](http://documentation.superfeedr.com/subscribers.html#http-authentication) (base64 encoded) 
* for subscriptions to `https://push.superfeedr.com/dev/null` 

{% prism javascript %}
...
  var source = new EventSource(url);

  source.addEventListener("notification", function(e) {
    var notification = JSON.parse(e.data);
    notification.items.forEach(function(item) {
      if(!item.source)
        item.source = {
          title: notification.title,
          permalinkUrl: notification.permalinkUrl
        }
        that.state.stories.unshift(story);
        that.setState({
          stories: that.state.stories
        });
      });
  });
}
{% endprism %}

For each notification, we make sure we have the right source information, and we use [React's setState](https://facebook.github.io/react/docs/component-api.html#setstate) to change the state and re-render the components.

As you can see, this is all fairly simple and straightforward!


[^1]: We use [btoa](https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/btoa) to create a base64 encoding string with the credentials. It's only partially supported by older browsers. 

[^2]: the `serialize` function takes an object and turns it into a query string.