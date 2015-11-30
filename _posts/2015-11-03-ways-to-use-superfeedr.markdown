---
title: "2 ways to use Superfeedr"
description: "When consuming data from Superfeedr, you can choose between either pulling data from us or waiting for us to push you the data from the RSS feeds."
tags: [subscriber, PubSubHubbub, howto, feed api]
---

<svg width="45%" height="30%" viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg" style="float:right;">
 <g>
  <path id="svg_6" d="m451.313049,220.109985c28.809906,18.490021 57.601654,37 86.45697,55.410034c-0.490356,0.859985 -1.389221,1.279968 -2.124695,1.819977c-15.553528,9.880005 -31.034393,19.889984 -46.560699,29.829987c-12.64801,7.890015 -24.987335,16.430023 -37.835114,23.900024c0.090759,-9.52002 -0.04541,-19.049988 0.081726,-28.570007c-63.267395,0.080017 -126.543854,0.02002 -189.811249,0.029999c0.054504,-17.920013 0.027252,-35.829987 0.018158,-53.73999c63.276489,0.019989 126.562012,-0.050018 189.847565,0.029999c-0.22699,-9.570007 -0.081726,-19.140015 -0.072662,-28.710022z" fill="#259B24"/>
  <path id="svg_8" d="m57.740002,122.299988c49.665981,-18.209991 98.941761,-36.869995 148.451679,-55.269989c1.420349,9.529999 0.234116,19.149994 0.577499,28.720001c31.669479,-0.139999 63.338974,-0.029999 94.992844,-0.070007c3.387024,-0.529999 3.667969,1.810013 3.418243,3.300003c-0.218506,16.820007 0.015594,33.639999 -0.109253,50.460007c-32.74646,0.279999 -65.508545,0.190002 -98.255005,0.040009c-0.062424,9.579987 0.109268,19.149994 -0.093643,28.720001c-2.278839,-0.610016 -4.542053,-1.25 -6.680405,-2.050018c-46.388229,-17.25 -92.6828,-34.619995 -139.102238,-51.829987c-1.248672,-0.559998 -2.310043,-1.230011 -3.199722,-2.02002z" fill="#8BC34A"/>
  <g id="svg_14">
   <path id="svg_9" d="m316.010223,67.020004c10.771515,-0.020004 21.54306,-0.050003 32.314575,0.009995c7.063904,0.199997 14.751709,4.399994 18.107941,13.610001c3.600067,8.960007 2.431152,19.509995 2.639099,29.320007c0.222321,8.309982 -1.168915,17.309982 -5.522003,23.36998c-4.324402,6.110016 -10.735687,8.130005 -16.702332,8.190002c-5.622437,-0.049988 -11.244843,0.190002 -16.860107,-0.199982c-0.437469,15.940002 -0.071716,31.919983 -0.193634,47.880005c-4.604065,0.059998 -9.20816,0.049988 -13.805054,0.009979c0.014343,-40.72998 -0.028687,-81.459991 0.021515,-122.189987z" fill="#8BC34A"/>
   <path id="svg_10" d="m376.243286,67.009995c4.675812,0.050003 9.351593,-0.179993 14.020233,0.139999c-0.093231,29.300003 0.014343,58.610016 -0.050201,87.910004c-0.007172,5.440002 0.552185,11.529999 3.521179,15.48999c2.531525,3.600006 6.275024,4.640015 9.753204,4.940002c4.266998,0.040009 9.079071,-0.98999 12.02652,-5.75c2.674957,-4.319977 2.983337,-10.319977 3.026367,-15.769989c0.007172,-28.980011 -0.007202,-57.960007 0.007172,-86.940002c4.589722,-0.059998 9.179443,-0.020004 13.776367,-0.029999c0.035858,30.350006 -0.014343,60.700012 0.028687,91.049988c0.064545,8.710022 -2.259033,17.610016 -6.798553,23.710022c-5.600891,7.589996 -13.711823,10.579987 -21.36377,10.269989c-7.788208,0.23999 -16.064087,-2.940002 -21.578918,-10.959991c-4.331573,-6.01001 -6.411316,-14.640015 -6.396942,-23.050018c0.04303,-30.339996 -0.014374,-60.669983 0.028656,-91.009995z" fill="#8BC34A"/>
   <path id="svg_11" d="m443.640686,67c4.611237,0.020004 9.229675,-0.050003 13.840912,0.050003c-0.107574,29.979996 -0.014343,59.969986 -0.04303,89.960007c0.050201,4.869995 -0.150604,9.73999 0.172119,14.599976c10.742828,-0.299988 21.500031,-0.059998 32.250061,-0.129974c0.129089,5.799988 -0.014343,11.609985 0.114716,17.410004c-15.440125,0.25 -30.887451,0.039978 -46.334778,0.109985c0,-40.670013 0,-81.330002 0,-122z" fill="#8BC34A"/>
   <path id="svg_12" d="m495.275208,67c4.611237,0.020004 9.229645,-0.050003 13.848083,0.050003c-0.114746,29.330002 -0.014343,58.659988 -0.050201,87.990005c0.071716,5.519989 -0.172119,11.059998 0.172119,16.569977c10.757172,-0.299988 21.514374,-0.069977 32.271576,-0.119995c0.085999,5.800018 -0.028687,11.610016 0.093201,17.410004c-15.447327,0.230011 -30.894623,0.029999 -46.334778,0.100006c0,-40.670013 0,-81.330002 0,-122z" fill="#8BC34A"/>
   <path id="svg_13" d="m329.808105,83.270004c5.192139,0 10.384277,-0.100006 15.576416,0.019989c2.746674,0.220001 5.930786,0.740005 7.680634,4.110001c2.416779,4.450012 1.89325,10.410004 2.022339,15.660004c-0.136261,5.529999 0.494843,11.460007 -1.333893,16.610016c-1.305206,3.959991 -4.661438,5.72998 -7.62326,5.539978c-5.457458,-0.059998 -10.914948,0.130005 -16.365265,-0.100006c0.071716,-13.949982 -0.007172,-27.899979 0.04303,-41.839981z" fill="white"/>
  </g>
  <g id="svg_15">
   <path id="svg_2" d="m161.272369,220.440002c5.942505,-8.869995 22.266876,-10.609985 30.469849,-3.170013c5.196762,4.700012 6.595016,11.470001 6.525085,17.730011c-0.093216,5.600006 0.139832,11.200012 -0.163132,16.799988c-4.089828,-0.069977 -8.179657,-0.079987 -12.269501,0.02002c-0.384506,-6.929993 0.314606,-13.890015 -0.384506,-20.809998c-0.396164,-3.080017 -1.841019,-7.200012 -6.105621,-7.52002c-4.625824,-0.669983 -8.925385,2.580017 -9.368164,6.460022c-1.444839,11.179993 2.610031,22.23999 7.94664,32.309998c7.433929,14.209991 16.289413,28.139984 19.72673,43.579987c1.584671,8.550018 1.806061,18.110016 -3.926697,25.639984c-6.921265,8.910034 -23.874847,9.570007 -31.996262,1.570007c-3.996613,-3.829987 -5.686142,-9.049988 -5.895874,-14.109985c-0.256348,-5.960022 0,-11.929993 -0.128174,-17.900024c4.27626,-0.069977 8.564178,-0.069977 12.840454,0.01001c0,5.650024 -0.0466,11.300018 0.011642,16.940002c0.034958,3.460022 1.037018,7.299988 4.334518,9.559998c3.507248,2.450012 9.309921,1.080017 11.360657,-2.26001c2.039093,-3.119995 1.433197,-6.849976 1.444839,-10.279968c-0.838943,-13.27002 -7.573761,-25.51001 -14.157104,-37.290009c-6.035721,-11.179993 -11.815094,-22.649994 -14.180435,-34.869995c-1.095276,-7.540009 -0.559296,-15.670013 3.915054,-22.410004z" fill="#259B24"/>
   <path id="svg_3" d="m64.293213,214.26001c7.678642,-0.02002 15.368927,-0.059998 23.047554,-0.01001c5.569626,0.01001 11.162567,2.429993 14.122162,6.540009c2.749863,3.589996 3.623756,7.959991 3.588806,12.190002c-0.023315,10.98999 0.023293,21.97998 -0.011658,32.959991c-0.093216,5.97998 -2.575081,12.660004 -8.96035,15.779999c-5.651192,2.929993 -12.490891,1.839996 -18.736328,2.029999c0.093208,17.710022 -0.081558,35.419983 0.093208,53.119995c-4.392776,0.190002 -8.797211,0.169983 -13.189995,0.049988c0.0466,-40.889984 -0.046616,-81.779968 0.0466,-122.659973z" fill="#259B24"/>
   <path id="svg_4" d="m108.803658,214.299988c4.369484,-0.059998 8.72731,-0.069977 13.096786,-0.049988c0.069908,34.570007 -0.01165,69.140015 0.046608,103.710022c-0.023308,3.169983 0.687462,6.97998 4.357826,8.569977c3.192635,1.089996 7.562111,0.709991 9.659462,-1.889984c1.747803,-1.869995 1.642929,-4.400024 1.701187,-6.660034c-0.011658,-34.569977 -0.023285,-69.139984 0,-103.709991c4.136444,-0.019989 8.284531,-0.019989 12.42099,-0.059998c0.256332,34.610016 0.011642,69.220001 0.128159,103.829987c0.174774,6.25 -2.656631,12.75 -8.296188,16.840027c-7.026123,5.039978 -18.270248,4.970001 -25.133247,-0.27002c-5.441452,-4.089966 -7.969933,-10.449982 -7.958282,-16.539978c-0.0233,-34.590027 0.0233,-69.179993 -0.0233,-103.77002z" fill="#259B24"/>
   <path id="svg_5" d="m205.270142,214.279999c4.451035,-0.059998 8.902084,-0.059998 13.353119,0c0.058258,18.889984 0.128174,37.790009 -0.034958,56.679993c5.266678,0.080017 10.533371,0.059998 15.800034,0.01001c-0.023285,-18.910004 -0.023285,-37.809998 0,-56.720001c4.404434,-0.040009 8.808884,-0.070007 13.20166,0.130005c-0.256348,40.859985 -0.058258,81.720001 -0.093216,122.580017c-4.381119,0.049988 -8.75061,0.059998 -13.131729,-0.01001c0.011642,-18.410034 0.023285,-36.820007 0,-55.230011c-5.243378,0.029999 -10.486755,0.029999 -15.730133,0c0.093216,18.399994 -0.0233,36.800018 0.058243,55.199982c-4.485992,0.119995 -8.971985,0.100037 -13.446335,0.030029c-0.011642,-40.890015 -0.069916,-81.780029 0.023315,-122.670013z" fill="#259B24"/>
   <path id="svg_7" d="m77.366699,225.76001c4.835564,0.209991 13.178352,-1.700012 14.075554,4.269989c0.45443,11.639984 0.01165,23.329987 0.20974,34.98999c0.104858,2.720001 -0.163124,6.330017 -3.600456,7.540009c-3.472275,0.869995 -7.177597,0.330017 -10.743095,0.399994c0.139824,-15.72998 0.023308,-31.459991 0.058258,-47.199982z" fill="white"/>
  </g>
 </g>
</svg>

Superfeedr provides a powerful [RSS feed API](https://superfeedr.com/) which covers the 2 most important ways to consume RSS feeds: push and pull.


When consuming data from Superfeedr, you can choose between either **pulling data from us** or **waiting for us to push** you the data from the RSS feeds.



## The pull way

Traditionally, this has been how Google's Feed API worked (beware, [it's been deprecated](/google-feed-api-alternative/)). Your application queries our API endpoint, using the [`retrieve`](http://documentation.superfeedr.com/subscribers.html#retrieving-entries-with-pubsubhubbub)[^1]: mode with the feed's URLs and we respond with the feed's content. It's simple and has a lot of benefits.

#### Normalisation

All feeds returned use the [same schema](http://documentation.superfeedr.com/schema.html), be it ATOM, or most often, JSON. This makes consuming the data in your application a lot easier.

#### A Single Server

Consuming RSS feeds from many servers means that your application will perform a lot of HTTP requests to each of these servers... and will inevitably have to handle bugs and connectivity issues for *each* of these servers. Speaking to a single server will reduce the problem to communicating with just us! In practice, we just [combine feeds](/combining-feeds/) for you.

#### No backend

The web is built around protocols which require clients and servers. Yet, application servers are often considered liabilities: they're hard to maintain, cost money and cannot always be trusted. If you pull data from us, you can do it directly from the clients (browsers[^2] or phones), which means that you don't need to deploy, run and maintain a backend server.

#### CORS headers

When building a front-end only application which consumes RSS feeds, one of the challenges is to deal with the dreaded [Same-Origin Policy](https://en.wikipedia.org/wiki/Same-origin_policy) which all modern browsers implement. Our API endpoints support CORS headers which means requests coming from 3rd party domains will be served.


## The push way

On the other end, if you're planning on consuming thousands (or more!) RSS feeds from us, a better approach is to use our **push API**.
Rather than constantly asking us for the data you need, you can register endpoints where *we will push* the content of the RSS feeds as soon as they've been updated. For this, we use the [PubSubHubbub open protocol](https://en.wikipedia.org/wiki/PubSubHubbub).

#### Realtime

The most obvious benefit form this is that you don't have to query our API to learn about the latest feed entries in any given feed. We do what it takes to learn about new feed updates and we push the content to your servers immediately. That's the greatest benefit of [webhooks](/webhooks-improved/).

#### Decoupling

Another benefit of using the push architecture is that you **decouple** your feed collection processes (provided by Superfeedr) from the rest of your application (the core of it and what makes it different). Your customers will never know about Superfeedr or care about how the feed's content has been collected. It also means that you can easily switch *away* from Superfeedr if you're not satisfied with us.

#### No maintenance required

Finally, since we send you notifications for updates in the feeds we fetch, [including errors](http://documentation.superfeedr.com/subscribers.html#errors), using our push based APIs means that you are always in sync with us when it comes to dead feeds, errors, or significant changes. There is no need for periodical checks to identify the [broken feeds](/debugging-rss-feeds/) from the ones which are still active.


Generally, if you're building a complex application with a backend or if you need to aggregate a large amount of feeds (more than a couple dozens and up to tens of millions), we strongly recommend that you use our [PuSH APIs](https://superfeedr.com/subscriber/).


[^1]: In order for us to *know* about the RSS feeds, you first need to [subscribe](http://documentation.superfeedr.com/subscribers.html#adding-feeds-with-pubsubhubbub) to the ones we will poll on your behalf. Use our `/dev/null` endpoint for subscriptions!

[^2]: See our [river.news](http://river.news/) application for a great example of fully static server-less application.
