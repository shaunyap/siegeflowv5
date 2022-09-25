---

path: "/work/lullyselb"
date: "2019-02-15"
title: Automating customer lists on Mailchimp using Node.js
category: "project"
thumbnail: "./thumbnail.png"
tags: [node.js, axios, shopify, mailchimp]

---
![Lully Selb](./header.jpg)
[Github repo](https://github.com/shaunyap/shopify2mailchimp)

Lully Selb is an independent designer label that creates unique designs for the modern Muslim woman. With the growth in their subscription offering, they comissioned me to migrate their manual system to a subscription plugin on Shopify. Seemed simple enough. 

Given the need for a customizable monthly subscription box, Bold Recurring Orders was the clear winner in terms of functionality. However, there was an unforeseen hiccup. The best way to differentiate subscribers from regular customers was through the use of tags, which was how Bold implemented their system.

### There was, however, the small issue of Mailchimp’s official plugin for Shopify not supporting the import of tags.

Here, Node.js was the perfect way to create a lightweight utility that solves the problem to update the list in time for Lully Selb’s monthly shipments. Here's what I did.

### Getting the relevant customer info from Shopify
It's straightforward - after importing all my libraries and setting my environment variables to make the api calls, I create an empty array called mailchimpSub, with the intention of adding customer objects to it.

Then I make the following API call to shopify using axios to get subscribers.

```
axios.get(shopifyEndPoint)
  .then(response => {
    const customerArray = response.data.customers
    customerArray.forEach(function(shopifySub) {
      let status = "";

      if (shopifySub.tags.includes("inactive_subscriber")) {
        status = "unsubscribed";
      } else {
        status = "subscribed";
      }

      let mailchimpSub = {
        "email_address" : shopifySub.email,
        "status": status,
        "merge_fields": {
            "FNAME": shopifySub.first_name,
            "LNAME": shopifySub.last_name
        }
      }
      mailchimpNewSubs.push(mailchimpSub);

    })
  })
```

As the Shopify API uses query parameters, the search terms are put into "shopifyEndPoint". When we get the data from the call, the utility takes the following steps:
1. Create an empty string called status
2. If the customer has unsubscribed (and is tagged with "inactive_subscriber"), set the status string to "unsubscribed"
3. Otherwise, set the status string to "subscribed" 
4. We then create an object called mailchimpSub (singular) to represent the customer
5. We take the relevant information from the api call, as well as the status string we just created and add that to the object
6. We finally push this object onto our customer array

### Adding and updating these subscribers to a Mailchimp list
The above call is wrapped in a Promise, so as to ensure we first have the results of the Shopify call before attempting to do anything on Mailchimp. 

```
.then(response => {
        axios({
        method: 'post',
        url: mailchimpURL,
        headers: {
          Authorization: "Basic " + authBase64
          },
          data: {
          	"members": mailchimpNewSubs,
          	"update_existing": true
          }
        })
  ```
  
Mailchimp's API works a bit differently from Shopify's, so we have to add a bunch of header information. For some reason they don't say, a post request on their API has to have the secret key in Base64 and so that's what is happening in the Authorization part of the call. We turned the secret key into a Base64 string.

Our payload just includes the array of customer objects we created from the Shopify API call, and we set it to update existing customers if they already exist. Done.

### Finally, some housekeeping

The way the client structured their Mailchimp list is that there are various lists which separates the tiers - non-customers on their mailing list, customers, and then subscribers. So when someone subscribes, we want to programmatically remove them from the other two lists, which happens after the subscriber list gets added.

```
.then(response => {
  console.log("Success! List updated.")
  mailchimpNewSubs.forEach(function (sub) {
    deleteUsersFromMailchimpList(sub.email_address, mc_shopifyCustomersListID)
    deleteUsersFromMailchimpList(sub.email_address, mc_mailingListID)
  })
})
```

The function deleteUsersFromMailchimpList is written as such:

```
function deleteUsersFromMailchimpList(userEmail, list) {
    const emailHash = md5(userEmail);
    const mailchimpGetEndPoint = "https://us11.api.mailchimp.com/3.0/lists/" + list 
    + "/members/" + emailHash

    axios({
      method:'get',
      url: mailchimpGetEndPoint,
      headers: {
        Authorization: "Basic " + authBase64
      }
    })
    .then(response => {
      if(response.status == 200) {
        console.log(`Found ${userEmail} in ${list}`)
        axios({
          method:'delete',
          url: mailchimpGetEndPoint,
          headers: {
            Authorization: `anystring: ${mailchimpKey}`
          }
        })
        .then(response => {
          console.log(`${userEmail} removed from list: ${list}`)
        })
        .catch(error => {
          console.log(`Error removing ${userEmail} from ${list}`)
        })
      }
    })
    .catch(error => {
      if(error.response.status === 404) {
        console.log(`${userEmail} is not on the list(${list})`)
      } else {
        console.log(`Error getting ${userEmail} from the Mailchimp list.`)
      }
    })
  }
  ```
  
Essentially what the function does is to check if a user email is in a given list, and if so delete it. The interesting thing here is that the user email is passed as a md5 hash into the API endpoint.

## Closing thoughts
Writing this out I now realize that there might be a better way to make the delete call, instead of it through a forEach loop where I make individual API calls. However, I'm quite happy how it turned out as it works quickly without fuss. If you have suggested improvements do let me know.
  

