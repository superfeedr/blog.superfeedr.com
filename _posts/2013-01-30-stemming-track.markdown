---
title: Stemming Track
---

Most you already know about our [track API](http://documentation.superfeedr.com/misc.html#track). It allows you to subscribe
to keywords and keywords combinations, instead of actual feeds. For example, say you want to be notified for any mention of 'Superfeedr'? Just subscribe [to this feed](http://superfeedr.com/track?include=superfeedr).

Today, we're launching **stemming** support. Several of our track customers complained in the past that Superfeedr was not able to send them stories that mention "stories" when they susbcribed to "story". Rather than matching the word identically, we will match any expression that shares the same "stem" or root.

### Demo

Let's use the XMPP API with the [Psi IM client](http://psi-im.org/).
Download the client and connect it to Superfeedr's servers with login@superfeedr.com. Use your superfeedr login instead of `login` and your superfeedr password.

<p>
  <img alt="XML Console" src="/images/psi.png" style="float:left; margin: 0px 5px 5px 0px"> Once your connected, you should see a star indicating that you're connected.
</p>

Then, open the XML console (on Mac OS X, it's in the Tools Menu). This console is an wonderful debugging tool as it allows you to see whatever traffic transits through your client, but also allows you to send stanzas. _Make sure you check the enable box as well as check only the message and IQ boxes._

Now, open the XML input and type this:

<script src="https://gist.github.com/4673430.js">
</script>

<p><small>Replace the `demo@superfeedr.com` with your login@superfeedr.com, or you'll be disconnected</small></p>

You should see something like this in the XML console:

<img alt="XML Console" src="/images/xml-console.png" style="width: 100%; margin-bottom: 10px" > 

You will now receive all mentions of "superfeedr" that transits thru our system! If you want to try it by yourself, just add an small entry to this [Publisher Page](http://push-pub.appspot.com/) with the keyword "superfeedr" somewhere. You will see quickly a mention like this one below in the XML console:

<script src="https://gist.github.com/4673449.js">
</script>

### Let's make it better.

In the coming months, we will work hard at making track even better, with support for *language* matching (and stemming by language too!), as well as other key aspects for it.

We need your help to do so. As you are eventually going to be the ones whi use this API, please, let us know when you see things that should be better.

As we want to move away road blocks for this, we will make the **track API usage free for the next couple months** (at least 3). However, to do that, you will need to create a new [Supefeedr account](http://superfeedr.com/subscriber) and email us the info so we can whitelist them. Be creative!

Finally, we will present how we built Track as well as a couple awesome use cases (yours!) at the [Realtime Conference Europe](http://realtimeconf.eu/). Get your tickets now!



