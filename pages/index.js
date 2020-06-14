import React, { useState, useEffect } from "react";
import matter from "gray-matter";
import Link from "next/link";
import Head from "next/head";
import dynamic from "next/dynamic";
import { Row, Col } from "react-flexbox-grid";
import { config } from "react-spring";

const TextTransition = dynamic(() => import("react-text-transition"), {
  ssr: false,
});

import { SKILLS, PROJECTS } from "../constants/Stack";
import Layout from "../components/Layout";

function formatDate(date) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const today = new Date(date);

  return today.toLocaleDateString("en-US", options);
}

function freshWriting(date) {
  const writingDate = new Date(date).getTime();
  const today = new Date().getTime();

  return today - writingDate < 60 * 60 * 1000 * 24 * 2; // 2 days old
}

function Homepage({ writings }) {
  const [index, setIndex] = useState(0);
  const avatar = `/images/Avatar.jpg`;

  useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((index) => index + 1),
      3000 // every 3 seconds
    );
  }, []);

  return (
    <>
      <img className="about-avatar" src={avatar} />

      <Layout secondaryPage>
        <div style={{ marginTop: 50 }}>
          <h1 className="about-h1">
            Dylan{" "}
            <TextTransition
              text={SKILLS[index % SKILLS.length]}
              springConfig={config.gentle}
              style={{ display: "inline-block" }}
            />
          </h1>

          <div className="about-intro">
            <Row>
              <Col md={12}>
                I'm a full-stack engineer. I started coding my sophomore year of
                high school and have loved every day of it for the past 6+
                years.
                <br />
                <br />
                I've worked on a variety of problems helping startups, research
                labs, small businesses, friends, and family.
              </Col>
            </Row>
            <hr />
            <h3>Have a look around</h3>
          </div>
          <>
            <h3>{PROJECTS.title}</h3>
            <Row style={{ marginTop: 30 }}>
              <ul
                className="uses-list"
                style={{ marginTop: "0px", marginBottom: "0px" }}
              >
                {PROJECTS.data.map(({ image, name, description, link }) => (
                  <div key={link}>
                    <img
                      src={image}
                      alt={`Project - ${name}`}
                      style={{
                        width: "200px",
                        marginLeft: "10px",
                      }}
                    />
                    <li key={name}>
                      <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                      >
                        {name}
                      </a>
                      <br />
                      <br />
                      <span className="darker">{description}</span>
                    </li>
                    <hr />
                  </div>
                ))}
              </ul>
            </Row>
          </>
        </div>
      </Layout>
    </>
  );
}

Homepage.getInitialProps = async (context) => {
  const writings = ((context) => {
    const keys = context.keys();
    const values = keys.map(context);
    const data = keys.map((key, index) => {
      const slug = key
        .replace(/^.*[\\\/]/, "")
        .split(".")
        .slice(0, -1)
        .join(".");
      const value = values[index];
      const document = matter(value.default);
      return { document, slug };
    });

    return data
      .slice()
      .sort(
        (a, b) =>
          new Date(b.document.data.date) - new Date(a.document.data.date)
      );
  })(require.context("../writings", true, /\.md$/));

  return {
    writings,
  };
};
export default Homepage;
