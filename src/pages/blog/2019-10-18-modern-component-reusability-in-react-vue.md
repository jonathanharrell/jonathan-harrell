---
templateKey: blog-post
title: Modern Component Reusability in React & Vue
date: 2018-08-06T19:55:00.000Z
description: >-
  Learn how to use render props in React and scoped slots in Vue to create
  components that are flexible and reusable.
featuredpost: true
featuredimage: /img/implicit-state-sharing.svg
tags:
  - javascript
  - react
  - vue
  - render props
  - scoped slots
---
One of the issues all front-end developers face is how to make UI components reusable. How do we craft components in such a way that satisfies the narrow use case that is clear to us now, while also making them reusable enough to work in a variety of circumstances? Render props and scoped slots provide a solution.

Let’s say we are building an autocomplete component:
