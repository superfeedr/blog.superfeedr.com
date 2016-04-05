---
title: "Focus on the Front-End: Building an Asset Repository"
description: "Change is afoot in Superfeedr’s websites—change in the form of patterns, centralization, and standardization."
tags: [static]
author_name: Lucas
author_uri: http://lucascherkewski.com
author_email_md5: 9059e112be00a40606e7e16162e10e9a
js_includes: []
---

Change is afoot in Superfeedr’s websites—change in the form of patterns, centralization, and standardization.

In the summer of 2014, a team from [Van Patten Media Inc.](https://www.vanpattenmedia.com/)—in this case, [Chris Van Patten](http://www.chrisvanpatten.com) and [myself](http://lucascherkewski.com)—worked with Julien here at Superfeedr to [redesign the application’s web interface](https://blog.superfeedr.com/new-design/). We updated a dated design, surfacing functionality that was previously hidden, and made it easier for people new to Superfeedr to figure out just how great it is. The Van Patten Media team also worked on the public-facing elements of the website, redesigning the marketing site, documentation, and blog from the ground up.

We were happy with the results of these redesign projects, and were excited at the opportunity to work with Julien again on a new project: developing a centralized asset repository and pattern library for all Superfeedr web properties.

## Project goals

We had a few key goals with this latest project:

+   Develop a repository that all properties could pull from, centrally-updated so that improvements were shared;
+   Cut down on redundancy and push for more consistency across the interfaces;
+   Document all the patterns in use across Superfeedr’s various sites;
+   Make it easier to design new pages or properties in the future.

We’re happy to say that, after a few weeks of work, we’ve accomplished these goals! With all these new changes, there are a few in particular that we want to highlight and dig into a little further.

## Patterns, patterns, patterns

Whether you call it a pattern library or a style guide, this method of development and documentation has increased in popularity over the last few years, and for good reason: it encourages and rewards modular thinking in terms of markup, styles, and functionality for front-end components.

When we set out on our initial redesign of Superfeedr back in in 2014, our first code took place in a small `patterns.html` file. We didn't set out to create a proper "pattern library" on day one, but having this file made it easier to see a collection of components in one place and, as we started to design full pages, simplified the work by letting us copy and paste.

This initial, informal pattern library was brought out again as we started working on this most recent project. Because a key goal for the project was to create a "centralised repo" for our assets, we knew we'd have to combine stylesheets from a few sources. A structured, formal pattern library would help prevent us from missing key modules or duplicating code as we merged the assets into one canonical source.

We evaluated a number of open source pattern documentation tools, but eventually landed on a custom approach. We gave each pattern its own HTML file, and loaded each one into an `<iframe>` in the final output via a build process powered by [`gulp-file-include`](https://github.com/coderhaoxin/gulp-file-include), using the [`srcdoc`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#attr-srcdoc) attribute. This ensured that each pattern could function in isolation, unaffected by other modules or the pattern library itself.

We also added a brief description and usage notes for each pattern, so that anyone looking to extend Superfeedr in the future could easily understand which patterns to use, and how. We built, in essence, [a tiny Bootstrap](http://daverupert.com/2013/04/responsive-deliverables/#tiny-bootstraps-for-every-client) for Superfeedr’s use—and you can [view it yourself, too!](https://assets.superfeedr.com)

Making this pattern library helped us find parts of the design that were redundant, buggy, or less than ideal, and fix them to a known-good standard—fitting, given Superfeedr’s huge support for standards-based applications! Even though Superfeedr is just one entity, its four properties now stand that much more unified thanks to the documentation and implementation of these patterns, and any future expansions of the service can be quickly designed and implemented.

## Bootstrap compatibility

When Julien developed [river.news](https://blog.superfeedr.com/river-news/), he wanted to show off Superfeedr’s capabilities in an application that could be plugged into many websites and just work. When he did this, he styled the markup with Bootstrap classes, knowing that many websites use Bootstrap, so that if River.news was embedded on a site already using Bootstrap, it’d look great. However, he also wanted code styled with Bootstrap classes displayed on a Superfeedr property to look and feel like Superfeedr.

After evaluating a few options, and some conceptual tug-of-war as we tried to determine the most efficient way to do this, we settled on Sass [`@extend`s](http://sass-lang.com/guide#topic-7), which allow you to apply the styles from one CSS rule to another.

For example, here's how we mapped Bootstrap's inimitable button classes:

{% prism css %}
.btn {
  @extend .button;
}

  .btn-default,
  .btn-info,
  .btn-primary,
  .btn-success,
  .btn-warning,
  .btn-danger {
    @extend .button--raised;
  }

  .btn-default,
  .btn-info {
    @extend .button--neutral;
  }

  .btn-primary,
  .btn-success {
    @extend .button--positive;
  }
{% endprism %}

...and so on.

As you can see, we were able to avoid duplicating the actual rules by mapping our existing styles to the Bootstrap class names.

As we worked on this feature, we had a number of discussions (between ourselves and with Julien) about this particular requirement. It's an interesting challenge: how do you make an embeddable module look "native" in as many contexts as possible? We settled on this Bootstrap "map", but there are other approaches as well. We like the look of [CSS modules](http://glenmaddern.com/articles/css-modules), which allow you to automatically namespace and modularise CSS within a given widget. CSS modules are designed for large CSS codebases, but could also allow projects like River.news to provide "mappings" to frameworks like Bootstrap or Foundation, and allow users to swap between them without requiring multiple sets of markup. It would also make it easier for users to provide custom CSS that fits within their unique design.

We also realised the importance of good documentation of classes and markup. Even if not using a standardized CSS class structure—like BEM, OOCSS, SMACSS, or so on—adopting standard conventions for HTML structure and class names in your project can make it easier for others to adapt your work to their particular use case, without needing to fork it or reinvent the wheel.

Markup underlies all the work we do on the web, and being sensible about its form will go a long way towards increasing the interoperability of our various components.

## Conclusion

It has been a thrill to work with Julien on a service that's so important to so many organisations and projects around the web. Superfeedr stands for open protocols, open software, and open communications—which is why we were so excited to write this post and document our efforts.

Working with Julien on Superfeedr has been a fantastic experience, and we’re proud of the results of this project: we created a pattern library and central assets repository that drives all of the Superfeedr web properties, and will make it much easier to update them or make new ones in the future. We’re excited to see where Julien takes Superfeedr next!