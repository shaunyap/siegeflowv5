---
path: /blog/web-stacks-and-why-they-matter
date: "2022-09-20"
title: Web stacks and why they matter 
category: "blog"
thumbnail: “./thumbnail.jpg”
tags: [Web marketing, web stacks, infrastructure]
---

Websites are like the tip of the proverbial iceberg, that’s the part that is seen, but beneath the surface there is a lot going on. Having thought through and implementing several websites and processes for various companies, here is what I have learnt about building a web stack.

## A 30,000ft introduction to how websites work and why it’s complex
Without going too far down the rabbit hole — websites are comprised of three types of files which browsers read and render:
- HTML, which contains and semantically structures the web pages
- CSS, which styles the content
- JavaScript, which governs interactivity and logic

Simple enough, until one considers what it’ll take to manage a site of anything more than a couple of pages.

For one, just wanting to put new content requires a technical understanding that is simply no longer required for people. Just look to how easy it is to publish a tweet or Facebook update.

It is also really cumbersome to manage manually. A lot of this is what software was invented to do.

## The components of a modern web stack and why they’re needed
The essence of modern websites is to split the concerns into manageable components that content administrators, developers and designers can work and collaborate with.

### 1. A Content Management System (CMS)
The CMS is the place where content gets put it to be published to the website. It usually contains the sections of the site where content can get published to. Sometimes, a user can select from templates or use pre-built modules to customize the layout of the page. Some CMSes even allow for drag-and-drop interfaces.

A CMS is the interface through which the most number of people managing the website will interact with. It is thus important for it to be simple to use for non-technical users, as well as designed so desired actions are clear. 

Popular CMSes include WordPress and Drupal on the open-source end, Adobe Enterprise Manager for enterprises, but over the last few years there has been a trend to move towards Headless CMSes like Contentful or Sanity. (Headless means it’s agnostic to the front-end instead of being opinionated).

#### What to consider
- Is the UX easy for the people who will be using the CMS?
- Does it make it easy to extend it’s features?
- Are there enterprise features like Role-based access that we need?
- Does it handle history and rollbacks well?
- Does it allow for scheduling of posts?

### 2. A design system and component library
The designers on the team usually have a preferred tool like Figma that they do their design work in. However, all this design work is most useful when it is available in a library.

This allows content administrators to preview components (for example picking a different color and text for a button), and for developers to code up and capture the different variations of a component in a single place.

This tends to be front-end framework specific, but a good example of a component library is 
Storybook.js.

#### What to consider
The main concern here is to pick something that is amenable to how the teams already operate. With regards to design systems and component libraries, a less optimal system that everybody uses is much better than the perfect one that nobody does.

### 3. The front-end codebase
The front-end codebase is the brains of the operation which programatically governs how the different aspects are put together. It takes the content from the CMS and stitches it together with the chosen components to create the desired outcome.

This is a discipline professionals build entire careers around - but the important part is to choose a language/framework that lends itself well for existing skill sets, or experience that is easy to hire for or contract out to.

WordPress and Drupal are based in php, and has been a very popular language for web, .net is popular for many enterprises, but JavaScript has been the language of choice for many tech companies and startups alike, with frameworks and libraries like Next.js and Gatsby.

#### What to consider
- Are there business-specific that mandate certain features that are only available in some frameworks?
- What are our current teams comfortable in?
- What would be the least difficult to hire for/contract out?
- Is this scalable?


### 4. Hosting
Hosting is an area where there has been a lot of recent innovation as well. In the past, you could pay for a virtual private or shared server, and run a common server type nGinx or Apache and be sure that your chosen stack would run. But hosting these days have a lot more functionality like load balancing or edge-computing to help your site load faster.

The best thing to do here is to do a bit more research into the best hosting platforms for your chosen stack, but popular ones include Linode, Vercel, Netlify and all the way up to AWS and Azure.

### 5. Bonus round: version control and performance monitoring
While not required to get a site up and running, version control and performance monitoring tools have become a vital part of the management arsenal.

The most popular version control tool by far is Github, although GitLab is certainly used as well. It allows for multiple people to be working on the codebase at the same time, creating and later merging different variations. It also provides tools for reviewing and rolling back of code should something in the system breaks

Performance monitoring tools are also a vital part of keeping an eye on how a website performs, after all, technical performance is closely tied to business goals too.

## Why it matters
The decisions you make when it comes to your web stack can mean the difference between a website that is fun and a joy to work on, and one that is a dread to work with. Having a good stack allows for new features to be quickly developed and deployed on a stable infrastructure that minimizes downtime and therefore time spent dealing with unforeseen issues. Teams are able to focus on what they do best for your organization.

The flipside is that if the system fights against the teams they're meant to serve, the team might just choose to go around it and "find their own solutions". Typically that means wasting a lot of time and resource on something that in the best case might look passable, but ultimately doesn't plug into the larger operating process, causing the business to miss out on insights and the ability to look back or follow up.

