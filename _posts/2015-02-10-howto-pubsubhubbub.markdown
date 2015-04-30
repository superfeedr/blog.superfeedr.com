---
layout: post
title: "How to implement PubSubHubbub"
author_name: Julien
author_uri: http://ouvre-boite.com
author_email_md5: b30ce50678f0e934eaa6697425c59dd7
js_includes: []
tags: pubsubhubbub, howto
---

[PubSubHubbub](https://en.wikipedia.org/wiki/PubSubHubbub) is a free, open and decentralized protocol. It relies on **webhooks** to push feed updates in real-time from *publishers* to *subscribers* (feed readers).

Most importantly, **PubSubHubbub builds on existing infrastructure**: implementing it won't change or break your current polling infrastructure, and if for some reason something fails, you can still resort to polling (like you probably already do).

Milions of feeds are PubSubHubbub enabled. Let's use [this blog](http://blog.superfeedr.com/)'s [feed](https://superfeedr-blog-feed.herokuapp.com/) as an example. It works the same for *any other feed*.

<br />

## Discovery

The first time you fetch the feed, look for `<link>` element with `rel=hub` in it [^1].

{% prism markup %}
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>Superfeedr Blog : Real-time cloudy thoughts from a super-hero</title>
  <link href="https://superfeedr-blog-feed.herokuapp.com/" rel="self" type="application/atom+xml"/>
  <link href="http://blog.superfeedr.com/" rel="alternate" type="text/html"/>
  <link rel="hub" href="http://pubsubhubbub.superfeedr.com/" />
  <updated>2015-02-03T13:08:02+01:00</updated>
  <id>http://blog.superfeedr.com/</id>
...
</feed>
{% endprism %}

The most important line is:
{% prism markup %}
<link rel="hub" href="http://pubsubhubbub.superfeedr.com/" />
{% endprism %}
It tells us that this feed is available in real-time at [this community hub](http://pubsubhubbub.superfeedr.com/).

The second most important line is:
{% prism markup %}
<link href="https://superfeedr-blog-feed.herokuapp.com/" rel="self" type="application/atom+xml"/>
{% endprism %}
It tells us the *canonical* URL for this feed. It's the *actual* feed URL that we should use for subscriptions. Most of the time it will be this URL that you might have fetched, but sometimes, it may differ and when that happens, you need to use the `self` URL.

<br />

## Subscription

Here comes the meat if this tutorial on how to implement PubSubHubbub. PubSubHubbub is based on [webhooks](https://en.wikipedia.org/wiki/Webhook), which means you need to have an **HTTP server** able to handle requests coming from the web (not behind a firewall, and no `localhost`).

In our case, we have a webhook located at [this address](http://push-pub.appspot.com/webhook).

The subscription request is a `POST` HTTP request. You can issue it using a command line tool like `curl` or any other type of HTTP library and client. The subscription request is sent to the hub URL (see discovery above).

{% prism bash %}
curl -X POST <hub> 
  -d'hub.mode=subscribe' 
  -d'hub.topic=<feed self url>' 
  -d'hub.callback=<webhook>' 
  -d'hub.verify=sync'
{% endprism %}

When the request hits the hub, the hub will proceed to the [verification of intent](https://pubsubhubbub.googlecode.com/git/pubsubhubbub-core-0.3.html#verifysub). This is a step to prevent spam as the hub needs to confirm that you own (and control) the `webhook`[^2].

The verification request is a `GET` HTTP request sent to the webhook which includes all the details of the subscription and an additional `hub.challenge` parameter. **To confirm**, the webhook needs to serve a `200` status and output the `hub.challenge` in the response body.

* If the subscription is confirmed, the hub will respond with a `204` status. 
* If not, the hub will respond a `422` status and yield an error message in the response body.

Try it yourself:

{% prism bash %}
curl -X POST 'http://pubsubhubbub.superfeedr.com/' -d'hub.verify=sync' -d'hub.topic=https://superfeedr-blog-feed.herokuapp.com/' -d'hub.callback=http://push-pub.appspot.com/webhook' -d'hub.mode=subscribe' -D-
{% endprism %}

It should yield something like:

{% prism bash %}
HTTP/1.1 204 No Content
X-Powered-By: The force, Luke
PubSubHubbub-Version: 0.3
Date: Tue, 10 Feb 2015 13:42:25 GMT
Connection: close
{% endprism %}

<br />

## Notification

Once the subscription is confirmed, the hub will inform you of any change in the feed by sending `POST` requests your webhook.

The body of the POST request *includes* the new content: this is a **fat ping**. The notification will *only* include the new entries in the feed, along with the header part of the feed: its title, links... etc.

Many languages and framework will assume that POST requests are the results of *forms* and will try to parse the content and may show and empty body. If you're using PHP, use [`php://input`](http://php.net/manual/en/wrappers.php.php#wrappers.php.input) instead of `$_POST`. With Ruby On Rails, you need to use [`request.raw_post`](http://api.rubyonrails.org/classes/ActionDispatch/Request.html#method-i-raw_post) in your controllers... etc.

Here's what the body of a notification will look like:

{% prism markup %}
<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
    <link rel="hub" href="http://pubsubhubbub.superfeedr.com" />
    <link rel="self" href="http://push-pub.appspot.com/feed" />
    <link title="Publisher example" rel="self" href="http://push-pub.appspot.com/feed" type="application/atom+xml" />
    <title>Publisher example</title>
    <updated>2015-02-10T14:22:04.000Z</updated>
    <id>http://push-pub.appspot.com/feed</id>
    <entry xmlns="http://www.w3.org/2005/Atom" xml:lang="en">
        <id>http://push-pub.appspot.com/feed/6282187997446144</id>
        <published>2015-02-10T14:22:04.000Z</published>
        <updated>2015-02-10T14:22:04.000Z</updated>
        <title>Hello World</title>
        <content type="text">PubSubHubbub is easy!</content>
        <link title="Hello World" rel="alternate" href="http://push-pub.appspot.com/entry/6282187997446144" type="text/html" />
    </entry>
</feed>
{% endprism %}

<br />

## Tools and Good Practices

If you're looking for a feed that updates frequently to test your implementation, we suggest you [check this simple application](http://push-pub.appspot.com/) and [its feed](http://push-pub.appspot.com/feed). It supports PubSubHubbub and updates that you post should be propagated in real-time.

If you're trying to debug HTTP calls and inspect their content, check out [RequestBin](http://requestb.in). It lets you create webhooks that support PubSubHubbub. As an exercise, replace the webhook in the examples above with a RequestBin URL.

Later, you should think about using different callbacks for every feed. It simplifies debugging and handling of notifications by letting you immediately know which feed is linked to which notification. It's often as easy as adding a query string like `?feed=key` at the end of a generic webhook.

You should submit a `hub.secret` to the hub when issue subscriptions. This secret should be unique and will let the [hub sign notifications](https://pubsubhubbub.googlecode.com/git/pubsubhubbub-core-0.3.html#authednotify) so that you can easily make sure the notification is coming from the hub, and not from someone trying to impersonnate it. You should also **use HTTPS both** for the hubs and your callback URL.

Last, but not least, you should know that Superfeedr can act as a [default hub](https://superfeedr.com/subscriber/) for **any feed** whether they support PubSubHubbub or not. We also normalize the data in JSON or Atom for your convenience...


Happy real-time hacking!



[^1]: You could also look at the HTTP headers for a `Link` header (but this is more common for JSON resources), as per the most recent [PubSubHubbub spec](https://superfeedr-misc.s3.amazonaws.com/pubsubhubbub-core-0.4.html).

[^2]: Since we used the `hub.verify=sync` param, the whole process is *synchronous* which means that the hub will issue the request to the webhook *before* responding to the subscription request. You could also use `hub.verify=async`, but it's much harder to debug, because the hub will not be able to yield an error message if the verification failed.
