---
title: "Language Detection"
tags: [language, feed api, metadata]
---

Extracting more metadata about feeds and entries is one of our highest priorities. A couple months ago, [we started surfacing](/more-metadata/) a *porn rank* and a *bozo rank* to help you identify NSFW or broken feeds.

One of the most obvious meta information is the **language**. Our very first [schema](http://documentation.superfeedr.com/schema.html) already had language information for every entry published, but we found that many feed publishers do not include that information. As a result, we started working on **automating language detection** for each new entry.

To do this, we extract textual content: mostly the title, summary and content for any entry and we join them. It does not matter if the meaning is lost, because the next step includes breaking all this data information into sequences of 3 characters (including punctuation and white spaces), called [n-grams](https://en.wikipedia.org/wiki/N-gram). 

Each language has its own *signature* when it comes to these sequences of 3 characters, which means, that when we apply these to a previously trained [bayesian filter](https://en.wikipedia.org/wiki/Naive_Bayes_spam_filtering), we get pretty good results, even with a small amount of text.

Our current language detection is able to detect the following languages:

* English
* Spanish
* German
* Italian
* French
* Russian
* Portuguese
* Japanese
* Simplified Chinese (zh-cn)

We're already working on adding more. Feel free to send suggestions!

The language of each entry is the value of the `xml:lang` attribute on `<entry>` elements in our Atom schema and the json schema contains a `language` property. 

We do not extract the language for bozo feeds at this point.


