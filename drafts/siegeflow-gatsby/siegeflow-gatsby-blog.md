---
path: "/blog/moving-from-wordpress-to-gatsbyjs"
date: "2019-02-17"
title: "Powering Siegeflow.com with Gatsby"
category: "blog"
thumbnail: "./gatsby-hero.png"
tags: ["Gatsby", "React.js", "Markdown", "SASS"]
---

Moving from WordPress to Gatsby turned out to be a much easier decision than I had initially expected. It turns out that as I grew as a developer, most of my development stack is now JavaScript-based. 

So it only made sense for me to look for something JavaScript/React. When you  throw in my fondness for [Markdown](https://en.wikipedia.org/wiki/Markdown). It quickly set me down a path from which I found [Gatsby.js](https://www.gatsbyjs.org/).

Gatsby is an Open-Sourced React site generator that purportedly builds fast, secure and performant websites.

![Gatsby's Home Page - Build Blazing Fast Websites](./gatsby-hero.png)

It made me think, hey why not give it a go? So here's what I've learned and liked so far [building this version of the site](https://github.com/shaunyap/siegeflowv4)

### The Gatsby documentation is incredible, especially given how young a project it is
One of the first things I realized about Gatsby was how easy it was to figure out how things work, and how things were set up. Their docs, code samples and examples made it easy for me to folllow. Which is huge, because as a small projects, there hasn't been much discussion on Stackoverflow and other sites. Not that I needed them much for this project. It's crazy to think the project is only a bit over three years.

### The team is super community-focused
I've always found contributing to open-source projects intimidating. But the team at Gatsby make it seem really welcoming, and it's something I'm actively considering doing once I'm done with this project. You can schedule a one-on-one pair coding sesion over a video call to get someone to help walk you through the project. They even give swag to everyone who contributes.

### They've got their tooling process is locked in
Getting up and running with Gatsby was one of the quickest processes I've gone through with a tool like this. No configuring various other tools to get started. From hot-reloading to pre-fetching links, it's all preloaded. Adding support for GraphQL, SASS and Markdown is also super easy!

### Gatsby takes data from a variety of sources
Even if you're running WordPress, or Shopify, Gatsby is able to use those as datasources from which it creates the front-end. This gives the ability for less technical people to add posts and content to the site from their favorite CMS and not have to worry about code. I just love that I'm able to write in Markdown files.

### It generates dynamic content at build-time, not run-time
This means that while content can still be dynamic to some extent, it does not get built at run-time. Gatsby just produces the required static files so everything loads quickly. This means a couple of things, since it's only static files, there's one less vector of attack. The other being if you're running a site out of your own pocket, you can stick to the lower plans for longer.

All in all, I'm quite pleased with how the experiment is turning out. I look forward to completing my new site and showing this to everyone!