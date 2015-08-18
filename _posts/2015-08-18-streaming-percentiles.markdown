---
layout: post
title: "Streaming Percentiles"
author_name: Julien
author_uri: http://ouvre-boite.com
author_email_md5: b30ce50678f0e934eaa6697425c59dd7
js_includes: []
description: ""
tags: algorithm, streams, percentiles
js_includes: [
'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/1.0.2/Chart.js',
'https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML',
'../scripts/streaming-percentiles-charts.js'
]
---

Last week, we wrote about [averages for streams of data](/streaming-average/). Today, we're addressing a much more complex issue: **medians** and more generaly **percentiles**. It turns out that there are many solutions to this problem, but most of them involve things like windowing, sampling or [binning](https://en.wikipedia.org/wiki/Data_binning). We'd like to propose a couple solutions which minimize the memory impact by avoiding these techniques.

All the Javascript code for these can be [found directly in there](../scripts/streaming-percentiles-charts.js).

### Percentiles

The chart below shows random values between 0 and 1, and the 90th percentile (in red). (as a reminder, the 90th percentile is the value for which 90% of all values are smaller).

<canvas id="static-dots" width="700" height="300"></canvas>

The graph above is not what we want to achieve, because of course, we have to have the knowledge of **all** the values to find the 90th percentile. Let's refine it with a **streaming** approach where we only know about the data as it comes and hence compute the percentile for each new value added to the stream.

<canvas id="static-percentile-with-memory" width="700" height="300"></canvas>

This is already much better, because we only assess the 90th percentile based on *historical data*, and, as more data comes, it converges to the actual value we found above. However, keeping all the past elements in memory is not something feasible. And even if storing all the values was an option, this approach adds **too much weight** to older values.

### Local maxima

> One thing which may be obvious when you look at both charts above is that values in the **90th percentiles are local maximums** most of the time. 

Luckily, keeping track of the maximum in a data stream is quite simple and very cheap in terms of memory: compare any new value with the current maximum. If the former is greater, it's promoted as the new maximum. If not, the maximum stays the same. 

Finding **local maxima** is a matter of *forgetting* the previous highest values by giving them less weight using a decay function. For example, we could apply a decay to the current maximum equal to the number of values which have been *smaller* than the maximum since it was promoted.

Here's a simple example to describe this:

* At `t=0`, we found that `M=6` is the new maximum. The decay D is 0, since M was just promoted.
* At `t=1`, we found a value `k=4`. 4 is smaller than 6, so M stays the maximum and we increase the decay D by 1 (D=1).
* At `t=2`, we found a value `k=2`. 2 is smaller than `6-1=5` (M-D), so M stays the maximum and we increase the decay by 1 (D=2).
* At `t=3`, we found a value `k=5`. 5 is greater than `6-2=4`, so M is now 5 and we reset D to 0.
* At `t=4`, we found a value `k=8`. 8 is greater than 5-0=0`, so M is now 8 and we reset D to 0.
* ... and so on...

The main challenge is to find the **right decay function**, as they obviously yield different results. Luckily, experimenting is fairly simple. The graph below shows 3 decay functions and the corresponding results.

<canvas id="percentiles-as-local-maxima" width="700" height="300"></canvas>

* The red line shows the *smallest decay* applied to the local maximum. It will only include the highest percentile. (empirically we can see that it matches about 2 or 3 dots out of the 50 visible dots: its 95% percentile)
* The green line shows a slightly heavier decay. 
* The blue line shows the local maxima with the *heaviest decay* (almost every other point matches. Its average would probably be a fair median)

### Standard deviations to the rescue

When the *standard deviation* is relatively small compared to the mean, another interesting approach is to exploit [Chebyshev's inequality](https://en.wikipedia.org/wiki/Chebyshev's_inequality):

> In probability theory, Chebyshev's inequality guarantees that in any probability distribution, no more than $$\frac{1}{k^2}$$ of the distribution's values can be more than k standard deviations away from the mean.

These $$\frac{1}{k^2}$$ would be the percentile we want to extract. If we're looking for the 90th percentile, that means $$k=\frac{1}{3}$$. In other word, any **value greater than 3 times the standard deviation has to be in the 90th percentile**. So, rather than computing percentiles directly or keeping track of local maxima, we can just compute the *standard deviation* and immediately find to which percentile an item belongs.

For **normal distributions**, we can use the [empirical rule](https://en.wikipedia.org/wiki/68%E2%80%9395%E2%80%9399.7_rule) to go a even further and get even better approximations. The rule says that ~68% of points are within $$\sigma$$ of the mean, ~95% are withing $$2*\sigma$$ of the mean and ~99.7 are within $$3*\sigma$$ of the mean, where $$\sigma$$ is the standard deviation.

Let's now see how to compute the standard deviation.

> The standard deviation ($$\sigma$$) is the square root of the **variance**. The variance is the average of the squared differences from the mean.

In math terms, the variance can be written like this: $$\sigma = \frac{1}{N} * \sum_{k=1}^N (\mu-k)^2 $$ where $$\mu$$ is the mean, $$N$$ is the number of items. We immediately see the **problem** here: *we need to keep track of all items to check their distance to the mean*. Luckily, Koenig and Huygens came up with an [algebraic formula for the variance](https://en.wikipedia.org/wiki/Algebraic_formula_for_the_variance) which states that $$\sigma = \frac{1}{N} * \sum_{k=1}^N k^2 - \mu^2 $$. The 1st member is the mean of squared values. As [we've seen previously](/streaming-average/), we can use recursive streaming averages to estimate averages of data streams.

Computing the variance is then trivial (as the difference of 2 streaming averages). From there, we get the standard deviation (square route), and we can then find in which percentile any data point is.

Here's a stream of data point from a normal distribution (Javascript code stolen from [Eric Woroshow](https://github.com/errcw/gaussian)) with a mean of 0.5 and a standard deviation of 0.1. The red line shows the 90th percentile ($$1.65*\sigma$$). 

<canvas id="percentiles-with-chebyshev" width="700" height="300"></canvas>

At Superfeedr, we use percentiles a lot for various things, including our [popularity rank](/feed-popularity/).


