---
layout: post
title: "We love HTTP Basic"
author_name: Julien
author_uri: http://ouvre-boite.com
author_email_md5: b30ce50678f0e934eaa6697425c59dd7
js_includes: []
description: "Most web applications these days will come with an OAuth endpoint to authenticate against the API. At Superfeedr, we stick to HTTP Basic. Here's why."
tags: api, authentication
---

One of the most recurring question that we have regarding our API is why we do not use OAuth. Generally, the question comes from people who do not use our API yet!
Our answer is 2 fold:

* OAuth is hard, complex, broken and non-standard. There are multiple implementation, versions... and it's even hard to find libraries which support them consistently.

* We actually do not need OAuth at all. OAuth was designed for web applications which would allow a 3rd party (not the user, not the provider) to access the user's content safely.


### HTTP Basic is simple

The most compeling aspect about HTTP Basic Authentication is that it's simple: [it does one thing and it does it well](https://en.wikipedia.org/wiki/Basic_access_authentication):

> In the context of an HTTP transaction, basic access authentication is a method for an HTTP user agent to provide a user name and password when making a request.

This is important, because it means that it does not guarantee that the messages themselves have been transmitted privately or have not been tempered with: that's [HTTPS](https://en.wikipedia.org/wiki/HTTPS)'s job, and you should of course **always use HTTPS** when submitting *HTTP Basic Authentication* credentials. 

When you look closely at how HTTP Basic works, you see that it involves sending a username and password as an HTTP header with any HTTP request. This means that it decouples the data being sent and received from the authentication layer, and sits between HTTP and your application's logic.

For Superfeedr, we went decided that passwords should probably be stay private and used only to manage your account. This is the reason why you [should use tokens](https://superfeedr.com/tokens/new) in lieu of passwords in your HTTP requests. Accounts can have an unlimited number of tokens and tokens can be revoked at any time.

### HTTP Basic just works

Another benefit of using HTTP Basic Authentication is that we have yet to see an *HTTP library which did not include syntactic sugar* around it. Why care about HTTP headers and Base64 encoding if you can just provide your username and secret token to it?

The fact that the spec is almost **20 years old** also means that it's as stable as you can hope and that years of implementations and best practices will protect you from ever-changing implementations and specs.

Our favorite HTTP client, [curl](http://curl.haxx.se/), also makes it trivial to add credentials. There's no need to open a browser, authenticate, copy and paste short lived keys.

{% prism bash %}
curl -u julien:password "https://push.superfeedr.com/?hub.mode=authenticate"
{% endprism %}



