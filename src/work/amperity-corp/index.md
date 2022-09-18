---

path: "/work/amperity"
date: "2021-07-01"
title: "Amperity.com"
subheader: "Building a scalable, performant platform for the future."
thumbnail: "./thumbnail.png"
tags: [Next.js, Contentful, Jamstack, React.js]
team: {
    webdev: "[Jiaji Li](https://jiajiali.me)",
    design: "[Amy Sun](https://www.amyfunsun.com)",
    creative: "[David Stychno](http://stychno.com/)"
}

---
![Screenshot of Amperity.com Home Page](https://www.siegeflow.com/static/21e38cd9b57468e37c41e606d9e447b2/ac99c/header.jpg)
[Live Site](https://amperity.com)

## The goal: switch front-end platforms from the PHP based craft, to something that's faster, more maintainable and scalable.

Given the number of products (twelve), each with multiple permutations of versions, operating systems and build branches, it would be unrealistic to maintain the respective download pages manually, espcially since the teams push new versions fairly often. We thus chose `Next.js`, a React.js based framework that allowed for both static and server-side rendering to interface with Chef's API packages backend, and render it to the user in a snappy, responsive manner. 

## Site Architecture: Strategies and Constraints
The underlying principle we took was to make it as easy for the 80% case, but to progressively iterate and build options for smaller and smaller edge cases, and quality of life improvements.

#### This 80% case we defiend as a given user would want to download the latest stable build of a current product for the operating system they were currently using. 
This drove a lot of the design decisions like the split between the above-the-fold products and the rest, and several defaults like landing the user on the latest stable version for their operating system. Layering in requirements from several teams like marketing, the field team and legal, and we had a plan to get to the MVP.

## Getting to the MVP
The user journey was fairly simple: 
1. Select a product on the home page
2. Click download on the right product
3. Fill a form
4. Land on the thank you page

Which meant that we only needed:
- A statically rendered home page, beautifully designed to lead people to the product
- Server-rendered product pages with a form that needed to pull package information from the API and to pass the relevant info to
- A thank you page that serves the file and attempts to answer "Now what?"

### The Home Page
The truth is, the bulk of the work here was done by our creative team (shoutout to the wonderful and talented [Hania Lisowska](https://hannalisowska.com/chef-software-visual-language)). The implementation builds on the component library work we've done in the past and basic Bootstrap. The details are uninteresting.

### The Product Pages
Each product page is essentially the same, by using [dynamic routes](https://nextjs.org/docs/routing/dynamic-routes), we could call up the appropriate API, and combine that with some custom copy to serve up each of the product pages with information and the download links.

The plan was to gate each person's first download with a form asking for basic information and so we used `Formik` as a logic/presentation layer on top of `Marketo` for its features like form and submit handler customizations, as well as data validation. The data was submitted into Marketo which Chef uses as a CRM. We used `cookie-js` to set a cookie to 'remember' if a person had downloaded a package before.

How it works is this: when a person clicks a download button, the handler looks to see if the cookie exists. If it does, then the user is routed to the thank you page alongside with some info on the file they are downlaoding. If the cookie does not exist, a modal with the form is called up, and filling the form also gives the same result. 

### The Thank You Pages
The thank you page was fairly straightforward. The dynamic urls indicate the product, and a query param takes in the download endpoint. We validate this endpoint to make sure it comes from our package repository, serve up that file to the user, and based on the product, look up a json file of appropriate starter resources for a user to get started with.

With these three main parts done, we called it MVP and moved on to feature/quality of life improvements.

### Getting to 1.0
The MVP announcement meant that the project was getting a lot more attention and excitement internally. We triaged the feedback and suggestions and identified the additions we wanted to make for our 1.0 version.

The big one was adding support for rendering markdown pages via API, as this enabled us to extend our site to also include (nicely rendered) release notes and licensing information.

Some of the smaller, but non-trivial improvements we had made to improve the overall experience was a better sorting function (especially for Windows, their Server and Consumer OSes are a bit awkward to handle), and OS detection so the site is able to default the OS to the one being used. We also worked to optimize the API to imrpove runtime performance.

### How we deploy
When it comes to web-dev, deployment is often a topic of frustration, as setting up environments and making sure the right tests and processes are in place can sometimes be a chore. We were lucky to have our ops team on hand to put a nice Continuous Integration pipeline in place that made it awesome for us to deploy to testing, and promoting that into production.

As I understand it, how it works is this: when new code is merged into the main git repo, a `buildkite` script gets fired off build the app using [Chef Habitat](community.chef.io/products/chef-habitat), which also packages it for a `Docker` container. It is then deployed onto a staging site where the team can review and QA. Once it's accepted, we promote it (on Slack, magically enough), and build kite then fires off a `Kubernetes` cluster of these containers. From our end, it's a Git Merge, testing, and a slack promotion.

## Closing thoughts
There were a whole bunch of people involved with the project, cutting across several disciplines, to whom a lot of credit is due. If this post makes it seems like webdev was the hero of the story, it is only because that's the part I'm most familiar with. Each of the indivudal pieces were critical to the success of the project, from the product and engineering teams, to creative and ops as well. 

This working together gives me incredible confidence and excitement about what comes next in Chef.

