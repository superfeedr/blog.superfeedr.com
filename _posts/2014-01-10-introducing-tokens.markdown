---
title: "Introducing tokens"
tags: [token, authentication, security]
---

This is yet another benefit from the introduction of [our new frontend](http://blog.superfeedr.com/push-endpoint/) back in november: starting today, Superfeedr offers [authentication tokens](https://superfeedr.com/tokens/new).

Up until now, you had to use your main Superfeedr login and password to perform API calls. This was **simple** but could also expose you to a security risk when working with a team if you had to share these credentials.

Today, we're **introducing simple authentication tokens**. In practice, they *behave exactly like passwords*. You will still use HTTP basic auth against our [`https://push.superfeedr.com`](https://push.superfeedr.com) endpoint: use **HTTPS**. The only important difference is that they can only authenticate against the API, and they can also be *limited in scope*. This means that a given token can only be used for certain calls: 

* subscription
* unsubscription
* listing subscriptions
* retrieving a feed's status
* xmpp authentication

You can generate an **unlimited** number of tokens, and **revoke** them at will. Feel free to read more in our docs on how to use them with [PubSubHubbub](http://documentation.superfeedr.com/subscribers.html#httpauthentication) or with [XMPP](http://documentation.superfeedr.com/subscribers.html#xmpppubsub).

### Implementation

This is actually fairly simple, but I want to give a quick thank you to [Bruno Pedro](http://brunopedro.com/), from [ApiUX](http://apiux.com/) for his quick help and tips.

The tokens are 32 bytes long strings, **randomly** generated, except for a small **CRC**. Using a CRC inside the string allows us to not hit the database for obviously wrong tokens. 

