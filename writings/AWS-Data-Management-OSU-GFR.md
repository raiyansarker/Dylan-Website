---
title: "AWS Data Management Solution for OSU’s GFR Team."
date: "2020-12-20"
og:
  description: "How my team and I developed a data management solution for OSU’s GFR team in the AWS cloud."
  image: ""
author:
  twitter: "DylanAlbertazzi"
  name: "Dylan Albertazzi"
---

This post shares how my team and I developed a data management solution for OSU’s GFR team in the AWS cloud. This six-month project satisfied my OSU college of engineering capstone requirements.

---

## ![Alt](https://www.global-formula-racing.com/wp-content/uploads/2016/01/Poster-Final.jpg)

## What is Capstone?

Capstone is a two-term course where seniors design and implement workable solutions to real-world engineering problems.

## What is GFR?

Global Formula Racing. Each year OSU students build a racecar from scratch and compete in races across Europe and the United States. OSU’s GFR team is a regular contender for wins and has achieved multiple top finishes in previous seasons.

For more, check out our team’s website [here](https://www.global-formula-racing.com/en/).

## The Brief

The GFR Data Management team exists to provide data to GFR members that they can leverage to make informed decisions to build a better racecar. The data management team is responsible for providing data access to all members of GFR, no matter where they are in the world.

Our team's design philosophy is heavily focused on the long term success of this project and the GFR team as a whole. Instead of focusing on what will work fastest, we recognized that our greatest contribution to GFR is what we can contribute to future teams. With that in mind, we focused on solutions that will not need to be rebuilt as the team and database grows, are cost-effective, and can be built on top of.

## Overview of tasks

Our sub-team goal, in the beginning, was to get all of the unorganized vehicle log files the team had, put them in a database, and build a UI to access, upload, and download data from. We got the old log files into a database running on the OSU stig server. However, over the course of the project, we realized that in order to build a UI we needed to consider the computing architecture the UI is built on. The UI part of the project shifted from building the UI to designing a computing architecture that can support the team’s long term needs. These needs include access to the web app anywhere in the world, scalability, and maintainability.

## Database

The vehicle log database we populated is currently hosted on the OSU stig servers and running on PostgreSQL. It has been populated with the available vector format vehicle log files from past runs. Each entry is a run from one of GFR’s vehicles and holds all the data that the onboard computer was able to log. Each log is separated into metadata, and channel data. Metadata consists of information about the car letter, car year, driver, track, etc. Channel data consists of numerical sensor readings, acceleration, velocity, etc.

## ![Alt](https://i.imgur.com/tdn6DsC.jpg)

## AWS

We achieved GFR’s computing architecture needs by designing a hybrid serverless architecture. Hybrid means the front end and computing are done in AWS and the database is hosted on the OSU stig servers.

## ![Alt](https://i.imgur.com/YQcDwI8.png)

Above is our final solution built on AWS with the database hosted by OSU. The architecture is serverless and utilizes lambda functions for computing. Connection to the database is made through Customer Gateway which is a service that will connect the OSU VPN to GFR’s network in the cloud.

Download the technical report of the project here.

<object data="/images/OSU-Capstone-Technical-Report-Albertazzi-Dylan.pdf" type="application/pdf" width="700px" height="700px">
    <embed src="/images/OSU-Capstone-Technical-Report-Albertazzi-Dylan.pdf">
        <p>This browser does not support PDFs. Please download the PDF to view it: <a href="/images/OSU-Capstone-Technical-Report-Albertazzi-Dylan.pdf">Download PDF</a>.</p>
    </embed>
</object>

Until next time!

-Dylan Albertazzi
