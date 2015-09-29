---
layout: post
title: "AngularJS Superfeedr"
author_name: Julien
author_uri: http://ouvre-boite.com
author_email_md5: b30ce50678f0e934eaa6697425c59dd7
js_includes: [
"https://ajax.googleapis.com/ajax/libs/angularjs/1.2.0/angular.min.js",
"../scripts/angular-superfeedr.js",
"../scripts/angular-demo.js"
]
tags: [javascript, angularjs, feed api]
description: "Parsing RSS feeds with Angular has never been easier by using Superfeedr. Here's a tutorial on how to consume RSS with Angularjs"
---

If you read us carefully, you've already seen that [we use AngularJS](http://blog.superfeedr.com/subtome-progress/) for [SubToMe](https://www.subtome.com/#/). Angular is an open source web framework for the client side. It's probably one of the most popular of its kind these days, so you've probably stumbled upon it a couple times.

Today, we're introducing a [Superfeedr module for Angular](https://github.com/superfeedr/angular-superfeedr). It implements all of our [Web API](http://documentation.superfeedr.com/subscribers.html#webhooks) so that it becomes *trivial* to build a client side application which *consumes feeds*.

And since a demo is worth a thousand words, here's a demo! Don't forget, this is **all static HTML**, hosted on Github.

<div ng-app="demo-app">

<h3 id="list-of-all-subscribed-feeds">List of all subscribed feeds</h3>

<p>Here’s the list of feeds used by the <code>demo</code> account. You can remove each subscription, as well as add new subscriptions as well.</p>

   <div ng-controller="listCtrl">
    <table style="width: 100%">
      <thead>
        <tr>
          <td><span ng-click='previous()'>&larr; Previous Page</span></td>
          <td><strong>Page</strong>:   {{ "{{ page " }}}}
</td>
          <td></td>
          <td style="text-align:right;"><span ng-click='next()'>Next Page &rarr;</span></td>
        </tr>
        <tr>
          <th style="width: 350px"><strong>Feed url</strong></th>
          <th><strong>Format</strong></th>
          <th><strong>Endpoint</strong></th>
        </tr>
      </thead>
      <tbody>
        <tr ng-repeat="item in subscriptions" ng-controller="subscriptionController">
          <td ng-click="retrieve()">{{ "{{item.subscription.feed.url" }}}}</td>
          <td>{{ "{{item.subscription.format" }}}}</td>
          <td>{{ "{{item.subscription.endpoint" }}}}</td>
          <td><button ng-click="unsubscribe()">Unsubscribe</button></td>
        </tr>
        <form novalidate ng-submit="subscribe()">
          <tr>
            <td><h4>Add a new Feed:</h4></td>
          </tr>
          <tr>
            <td>
              <input style="width: 350px" name="topic" ng-model="topic" ng-required="true">
            </td>
            <td>
              <select name="format"  ng-model="format" ng-required="true" ng-options="format as format for format in formats">
              </select>
            </td>
            <td>
              <input  style="width: 200px" name="callback" ng-model="callback" ng-required="true">
            </td>
            <td>
              <input type="submit" value="Subscribe">
            </td>
          </tr>
        </form>
      </tbody>
    </table>
  </div>
<div>
<br>

<h3>Get the status of a feed</h3>
<p>
  Please, note that you need to be subscribed to a feed in order to get its status and past entries. 
</p>

<div ng-controller="retrieveCtrl">
  <form novalidate ng-submit="retrieve()">
    <input style="width: 350px" name="url" ng-model="url" ng-required="true">
    <input type="submit" value="Retrieve">
  </form>
  <div ng-show="feed">
    <h4>{{ "{{feed.title" }}}}</h4>
    <p>
      <strong>Status</strong>: {{ "{{feed.status.http" }}}}<br>
      <strong>HTTP Code</strong>: {{ "{{feed.status.code" }}}}
    </p>
    <ul>
      <li ng-repeat="item in feed.items"><a href="{{ "{{item.permalinkUrl" }}}}">{{ "{{item.title" }}}}</a></li>
    </ul>
  </div>
</div>
</div>

<h3>Code</h3>
<p>You can of course <a href="/scripts/angular-demo.js">view the JS code</a> for this application, and view source to get the HTML!</p>



