---
title: "Architecting GrubGuide"
date: "2020-11-02"
og:
  description: "A look into GrubGuide's serverless architecture"
  image: ""
author:
  twitter: "DylanAlbertazzi"
  name: "Dylan Albertazzi"
---

A breakdown of GrubGuide's serverless architecture

---

## ![Alt](https://media3.giphy.com/media/wr6D4vIDWeaxWHe43b/giphy.gif)

GrubGuide exists to grow the Bend economy by providing insightful data to its local restaurants. We collect data through the GrubGuide website. The site delivers delightful, fast, and personal restaurant suggestions that make the tourists stay in Bend awesome.

The task for GrubGuide is twofold. **First, we need to provide a great restaurant suggestion to a tourist. Second, we must capture that tourist’s preferences in order to bring insights to our local restaurants.** There are a lot of strategies on the specifics of the recommendation algorithm and how to capture meaningful information however, that talk is for another time. Today is about architecture! So let’s talk more about the requirements of the site.

## Requirements

- GrubGuide must be able to scale up to meet the demands of traffic in the high months and scale down in the offseason.

- The site must be able to handle a high volume of traffic, especially as it is used in multiple cites. Let’s say 1M visitors per month.

- The data stored must be backed up and the read/write capacity needed will vary by day and time.

- Users will be primarily in the Pacific Northwest, at least for the near future.

- Lastly, costs should be minimized as much as possible.

## Solution

Because of the variability in traffic and the emphasis on keeping costs low, this project lends itself perfectly to a serverless architecture. Serverless means we will only pay for the compute we use and don’t need to worry about scaling up and down with traffic spikes. After much deliberation, the v.1 architecture was born. Below is a diagram of the setup 👇.

## ![](https://i.imgur.com/RlWWXlA.png)

Let’s go through this step by step. \*\*Note “(#)” refers to step “#” on the diagram above. For example (1) refers to the API Gateway in the diagram.

- First, the fronted is a bundled React app that is hosted in an S3 bucket. S3 is a highly reliable and scalable storage option within AWS.

- When a tourist fills out the survey it fires a request to the API Gateway (1).

- The Gateway then sends the survey results to a Lambda function (2) which runs the recommendation algorithm.

- Once the recommendation is made, the results are stored in a DynamoDB table (3). DynamoDB is a serverless database. Meaning it will scale its read/write capacity with the number of requests. Now we don’t need to worry about having the correct number of read/write units provisioned and risk either paying too much or our site crashing because it can’t handle the traffic. This capability is called “Auto Scaling” and does cost extra, but in the case of an unpredictable number of visitors, it’s well worth it.

- Finally, the response is returned to the API Gateway, and the user now has a great restaurant recommendation and a fun night ahead of them (4).

This setup meets all of the requirements and will only need slight tweaks to expand to new cities.

## Cost Breakdown

Let’s break down the first two weeks GrubGuide was released to friends and family. While it is not near the 1M monthly users the site was built for, we can still validate that the architecture only makes us pay for what we use.

In the two weeks, there were 79 users to the site and 777 pages viewed.

## ![](https://i.imgur.com/CAI288q.png)

The image below shows our AWS bill is $0. Great, that’s just what we expected, only pay for what we use! This idea is revolutionary and allows products like GrubGuide to be launched into the world without a large upfront investment of servers.

## ![](https://i.imgur.com/EJDYU8D.png)

## Conclusion

Congrats on making to the end of this quick peek under the hood of GrubGuide. Now go and get yourself a great restaurant suggestion with a newfound appreciation for how it works! 🎉

👉 [Go To GrubGuide](https://www.grubguide.io/)

Until next time!

-Dylan Albertazzi
