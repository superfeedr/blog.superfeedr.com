---
layout: post
title: "Follow buttons & the logged out user"
categories: []
author_name: Julien
author_uri: http://ouvre-boite.com
author_email_md5: b30ce50678f0e934eaa6697425c59dd7
tags: [subtome, indieweb, openweb, button]
---

> This article has been cross posted to other platforms, including [Svbtle](http://julien.svbtle.com/logged-out-users-follow-buttons).

Here is a new episode of my quest to understand and improve the [follow button pattern](http://julien.svbtle.com/follow-buttons-everywhere) on the web. 

Of course, I have found a lot of new follow buttons in this past month. Unfortunately, they all show the same characteristic: you can only use them if you have an account with the platform that shows them.

## The Logged Out User

Fred Wilson [coined the term](http://www.avc.com/a_vc/2011/06/dont-forget-your-logged-out-users.html) over 2 years ago. The logged out user is the *user who visits a site without an account on this site*, or, who has an account but is not logged in at the moment. Many websites have now understood that the logged out users account for *most* of the visits they receive everyday. Even Facebook now has a lot of content for the logged out user.

In practice, the logged out user is also, the **next user**. It's the user who will make the decision to signup or not. As Arnold Waldstein put it in the comments, the widest part of the engagement funel is made of logged out users, which is why it is extremely important to make sure these logged out users have the best experience.

## Trading identity for features

A few service will only show logged out users to signed up users. It's a bit sad, because it means they do not offer (or even advertise) such an important feature to the logged out users. That's the case for [Themeforest](http://themeforest.net/). You will only see Follow buttons on profile for the users if you are logged in.

Other services, like [Behance](http://www.behance.net/), will show Follow Buttons to their users, but once they're clicked on, the user is asked to signup. The buttons are used as a **bait**: give us your identity and we'll allow you to follow. In the day and age of the PRISM scandal, the price for one identity is probably going up and users are less and less willing to sign up with new services (which they may barely know) just to access a small feature. They probably also don't like the bait approach very much: nobody likes to try using a service and hit walls on every action.

This is a *missed opportunity*. If they had a way to offer that follow feature without forcing the user to sign up, they would have had an opportunity to engage the logged out user, build trust, and eventually get the user to signup when the user *wants* it.

## Services with no user accounts

Luckily, there are also a lot of websites for which there is no user account and hence only logged out users. Think about blogs, small corporate websites, classified ads services... etc.

Unfortunately, the engagement on these sites as a percentage is probably at an all time low (we spend our days on Facebook, Twitter or G+ it seems). I believe one of the reasons is that these smaller sites do not offer features like a follow button. 

Facebook, Google+, Twitter and other excel at sending us email reminders, mobile alerts which trigger a new visit to them.

The solution to that problem has been to provide RSS feeds and hope that users will be brave enough to copy and paste urls to their readers. We all know that it's too complex and is barely possible on mobile... compared to clicking on a Follow button.

## SubToMe

RSS is the plumbing solution to the decetralized follow model. There is no doubt about that: it's widely adopted on both ends (millions of websites publish one, there are hundreds ot readers to consume them). However, since it's plumbing, we still need the faucets and the sinks to avoid making a mess everytime we use them.

[SubToMe](https://www.subtome.com/#/) is a simple and **universal follow button**, which works on any website that has an RSS feed. It does not require a user account and will just redirect you to the feed reader you use when you click on it.

It's also fully [open source](https://github.com/superfeedr/subtome/), with no app server running and respects your privacy by only storing your data in your browser.
