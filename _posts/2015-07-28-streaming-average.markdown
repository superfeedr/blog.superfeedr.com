---
layout: post
title: "Streaming averages"
description: "State is a luxury that fewer and fewer application have: the data changes faster than it takes to iterate over it, it does not fit in memory and yet, we need simple things like averages to always be up to date. "
tags: [algorithm, streams]
js_includes: [
'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/1.0.2/Chart.js',
'https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML',
'../scripts/streaming-average-charts.js'
]
---


[JSConf.eu](http://jsconf.eu/) is one of the most amazing conferences I ever attended and talked at. If you get a chance, you should get a ticket for this year's. The presentation I gave there was about **streaming algorithms** in Javascript and Node. The core assumption is that the web has slowly been moving from a [spatial metaphor to a time-based metaphor](http://www.ouvre-boite.com/space-to-time/). There are many consequences to this shift at many levels: user-interfaces, architectures, business models even... but the most fascinating to me is that it even *changes the algorithms and the data-structures* our applications deal with.

Modern applications have to deal with new constraints:

* **memory is still incredibly limited** compared to the size of data we're dealing with
* the data sets are actually not set anymore, but **streams**, with no start and no end
* the inputs are **realtime**, but the outputs also need to be realtime

### Sampling and Windowing

Of course, the immediate and common answer to these problems would be windowing (only storing data between 2 events) and sampling (only taking random data). Windowing brings latency: you only get the data from the 'previous' window, while sampling may lead to loss of data. Sometimes, you want to avoid these two pitfals and that's when you have to *re-invent* the maths and algorithms you're dealing with.

Warning: if you're reading this from a feed reader, you may want to [hop on here](/streaming-average/), because you're missing on great illustrations and beautiful math formulaes :)

### What's the average?

Below is a series of points. Let's assume that this series is a coming from a datastream. We want to compute the average.
We only ever show 20 items, but we want to compute the averages over the whole data set (even the points which are not visible anymore...)

<canvas id="dots" width="700" height="300"></canvas>

The first approach, which we all learnt in school is the following: for each new point added to the series, sum all points and divide by the total number of points:

$$
\begin{align*}
  avg = \frac 1n \sum_{i=1}^n k_i
\end{align*}
$$

The problem with this is that if the frequency at which new items are added is higher than time it takes to count and sum all items, we will be **unable to compute the average as the dataset becomes bigger and bigger**. We are also quickly unable to store all of these items.

### Running counts

That first ambush can be quickly avoided by keeping memory of 2 extra variables: a **running count** of all items
and a **running sum** of all the items.

For each new item, we increment the running count by 1 and the running sum by its value. This way, the average is trivial to calculate for each new point:

$$
\begin{align*}
  avg = \frac {runningSum}{runningCount}
\end{align*}
$$

And we can easily add it to our graph:

<canvas id="running_average" width="700" height="300"></canvas>

This looks pretty, but if we wait a little bit, an obvious problem quickly arises: the **average will converge toward 0.5** (which is indeed the expected average for our dataset and won't ever evolve from there). If after years of being around 0.5 our data-stream suddenly starts to increase, it will take a long time for the average to reflect the change. 

### Recursive averages

The problem of running counts actually from our equation: the earliest dots have the same **weight** as the latest ones. This is probably a situation we want to avoid, because when considering a stream, the most recent data probably has more impact than the oldest data.

Another way to *view* the rolling average is that **each new item will affect the previous average**. We can then approximate the average as a weighted average of the previous average with the latest item. These are called [exponential moving averages](https://en.wikipedia.org/wiki/Moving_average#Exponential_moving_average):

$$
\begin{align*}
  avg_t = \frac {avg_{t-1} * (\alpha - 1) + x_t }{\alpha}
\end{align*}
$$

The value of $$\alpha$$ is what determines the *weight of the historical data*. The greater it is, the longer any given value will have an impact on the average.

Here's now our running recursive weighted average with 2 weights: 10 and 100. You can see how they both follow the trends differently. The $$\alpha=100$$ will not follow short-term changes, but it will also take a long time to recover from earlier biases.

<canvas id="recursive_average" width="700" height="300"></canvas>

At Superfeedr, we use **recursive weighted averages** a lot: they're the basis of our [popularity ranking](http://blog.superfeedr.com/subscribe-to-popular-rss-feeds/) for example.

