---
layout: post
title: "SubToMe: Angular, Localization and more!"
categories: []
---

The [SubToMe](https://www.subtome.com/#/) button we launched a couple weeks is now getting a **significant traction** and has been added to thousands of blogs and sites! This makes us very proud! Many readers now also support direct registration which makes them extremely convenient to use when susbcribing *on the fly*!

## AngularJS

[SubToMe](https://www.subtome.com/#/) is the perfect single page application as it does not even have an application server. It's [just static files](https://github.com/superfeedr/subtome) (HTML + JS) linked together with smart redirects and a little localstorage love.

At first, we did not use any framework, but maintaining the code while adding new functionnalities quickly made that a bad choice. After trying [Ember.js](http://emberjs.com/) and [Backbone.js](http://backbonejs.org/) we settled for [Angular.js](http://angularjs.org/). Even though the first one is very ambitious, it still feels too early to use, and the seconds felt a bit too lightweight. Angular's approach to **focus on HTML** seemed quite appropriate for us.

Rewriting the whole app was *relatively simple and quite pain-free* if you put aside the learning of all the angularjs vocab and architecture. There's probably room for improvment in our technique though!

## Localization

As one of the key goals of SubToMe is **simplicity of use**, localization is one of our priorities. Not everyone speaks English and as the concepts of "following" or "subscribing" are not obvious to english speakers, adding a language barrier was a no-go. Luckily, Javascript has a couple nifty localization tools. We settled on [i18next](http://i18next.com/) which is very complete and includes most of what we need. 

Most JS localization tools will not include a way to translate the HTML, as they expect that you're able to serve localized versions of these files. Given the lack of app server, we could not easily provide an HTML version of each of our files in all languages. [i18next](http://i18next.com/) comes with a very handy way to translate the content of HTML pages using JSON languages files. That's perfect for us.

Unfortunately though, i18next was *not built to work for Angular*, so we had to find a way to get it to work with it. After searching a a little bit, we found a [directive](http://docs.angularjs.org/api) by [Andre Meyering](https://github.com/archer96) which makes the **bridge** between the 2 awesome frameworks: [ng-i18next](https://github.com/archer96/ng-i18next). It was a bit rough around the egdes but Andre quickly iterated to make it much better!

SubToMe now has [french](https://github.com/superfeedr/subtome/tree/master/locales) (and english of course) :) We need to help to add more. Please get in touch: Spanish accounts for 5.04% of our traffic and Japanese for 3.80% already!

## Icing on the cake

We moved SubToMe to [Cloudflare](https://www.cloudflare.com/)! They offer SSL on custome domains, a pretty ubiquituous CDN (latency FTW!), as well as a complete optimizer which we plan on using to speed up the serving of SubToMe. 

Finally, along the way, we made the SubToMe modal responsive so that you can easily use it on mobile devices or tablets!

We have a lot more to do, and we're excited by the possibilities, but we're even more excited to see random blogs adding support. **It makes the web better and allows more people to follow more content in an open way**: add your button now.














