---
title: "Which AWS Services Netflix Uses 🎥"
date: "2020-11-28"
og:
  description: "Exploring Netflix's world class movie delivery tech."
  image: ""
author:
  twitter: "DylanAlbertazzi"
  name: "Dylan Albertazzi"
---

## Breaking down the AWS services Netflix uses through analyzing a movie's journey step by step.

---

<div style="position: relative; padding-bottom: 62.5%; height: 0;"><iframe src="https://www.youtube.com/embed/DxSdSmzXIsU" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

---

## Which AWS Services Netflix Uses

Netflix is one of AWS’s largest customers and has been since its shift to the cloud in 2008. Given the success of their business and years of experience, Netflix is an excellent company to study the cloud from. Today we’ll break down how Netflix is using AWS by walking through the user journey step by step.
Body
Before you turn on your tv, an immense amount of work has already taken place to prepare the movies Netflix will present to you.

Let’s take Spider-Man as an example. The journey starts when Netflix receives Spider-Man from Sony Pictures. The movie files are sent through multiple Lambda functions that process the footage, encode multiple copies to be watched on many different screen size types, and store the finished movie files in S3.

Once Spider-Man is processed and stored, it needs to be distributed across Netflix’s over 1,000 Content Delivery Network (or CDN) locations. For more detail on their CDN, watch my last video about how Netflix serves its 167M customers.

The whole movie library can’t be stored at every CDN location. To solve this they use Machine Learning to only store Spider-Man at locations where users will like it the most. After the locations to send Spider-Man are decided, another algorithm runs via Lambda or EC2 that determines the optimal time of day to actually send the movie for storage at the CDN location. Sometime soon, when the algorithm decided, Spider-Man is then stored across the CDN network and is ready for viewing. The Netflix team has dubbed this process “Netflix and Fill”.

The evening rolls around and you flick on Netflix to find a new movie to watch with your friends. Your TV (known as the client) is making requests to the Netflix server, which is running on an EC2 instance. These EC2’s power everything before you hit play. They determine the device you are on, recommend which movies you will watch, and grab the correct size movie thumbnails from an S3 bucket. One EC2 couldn’t possibly handle the millions of users Netflix serves on a regular basis. To handle the large and varying amount of users, they use an EC2 Auto Scaling group that can spin up or tear down EC2 instances to meet traffic demands. According to AWS, Netflix uses over 100,000 EC2’s.

Once you finally choose Spider-Man and hit play, the movie needs to be streamed to your device. To achieve this, a handoff is made from the EC2 backend to the CDN to stream your movie. The CDN is made up of over 1,000 locations across the world and serves two purposes. First, it makes streaming videos faster because the video travels a shorter distance. Compared to being streamed from one of the three AWS datacenters Netflix uses. Second, it lowers the load across the internet backbone. In short, this is because the video doesn’t travel as far, so fewer connections across the internet are needed to get the video to your TV.

To make the handoff, the backend finds the CDN location that has Spider-Man cached and will provide the lowest latency watching experience. Instructions to stream with the correct dimensions and subtitles are sent to the CDN and Spider-Man starts.

Netflix’s CDN is one of a kind and I highly recommend looking deeper into it if it’s something you find interesting. Just search for the “Open Connect Initiative” or check out the link in the description.

At first glance, it seems like we’re finished. We went from “Netflix and fill” to choosing a movie to streaming it. Well, we’re not going to stop here and leave out what makes Netflix… Netflix… the Data. And lots of it. Netfilx is known as one of the most data-driven companies of our day and uses it for everything from personal movie recommendations, to predicting when you’ll cancel your subscription, to deciding what tv show is worth investing $100 M in. Like they did to outbid HBO and AMC for house of cards back in 2011”.

At every stage, Netflix is collecting data. They collect the Completion rate of shows, when users dropped off shows, the time between watching episodes, when you pause, rewind, and fast forward, what day you watch Netflix (they found people watch more shows on weekdays and movies on weekends), your searches, what device you watch on, your browsing and scrolling behavior, and more.

With over 167 M users the amount of data being collected adds up quickly. But raw data without any order and processing is useless. Netflix processes data in multiple ways depending on what it’s being used for. In order to make movie recommendations better with Machine Learning, the workflow could look like this. Data stored in S3 is taken and used to train a model with Amazon SageMaker running on AWS Batch. SageMaker will build, train and deploy models and Batch splits up the data into small chunks to be processed in parallel, which drastically lowers the time it takes to train a model.
Batch is similar to EC2 Auto Scaling groups under the hood and handles the computing requirements as well.

In summary, the more data Netflix collects, the more accurate predictions they can make, the better Netflix can serve you, and the more likely you are to keep paying that just low enough $8.99 per month subscription fee.

It’s safe to say Netflix has it’s data-driven decision-making on lockdown, boasting over 1.6 billion dollars of per month revenue in 2019. However, with new big players like Disney + entering the streaming war in late 2019, there’s more competition than ever. The stakes for Netflix to accurately predict what we want and provide the best movie streaming service has never been higher.

With the competition heating up, Netflix’s heavy and wide-ranging use of AWS won’t be slowing down any time soon.

## Conclusion

Netflix is one of the world’s largest companies and there is a lot more detail that doesn’t fit into a short video. To learn more, check out the sources linked in the description. If you found this video interesting, like, subscribe and let me know what AWS topic you want to learn more about in the comments.

We’ll see ya next time!

For more depth on any of the topics dive into the sources 👉 [here](https://pastebin.com/MmWN63Hq).
