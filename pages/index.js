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

import { SKILLS, PROJECTS, SOCIAL } from "../constants/Stack";
import Layout, { Icon, InviteBox } from "../components/Layout";
import { solarizedDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

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

var subtitleStyle = {
  color: "#222",
  marginTop: "0px",
};


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
                Hi there and welcome 👋🏻.
                <br />
                I'm a full-stack engineer with dreams of creating businesses. 
                I've been coding for 6+ years and have loved every day of it. 
                I've worked with small businesses, startups, and research labs.

              </Col>
            </Row>
            <hr />
          </div>
          <>
            <h2>{PROJECTS.title}</h2>
            <Row style={{ marginTop: 30 }}>
              <ul
                className="uses-list"
                style={{ marginTop: "0px", marginBottom: "0px" }}
              >
                {PROJECTS.data.map(
                  ({
                    image,
                    name,
                    description,
                    link,
                    subtitle,
                    link_affiliation,
                  }) => (
                    <div key={link}>
                      <img
                        src={image}
                        alt={`Project - ${name}`}
                        style={{
                          width: "200px",
                          marginLeft: "10px",
                          borderStyle: "solid",
                          borderRadius: "8px",
                          borderWidth: "4px",
                        }}
                      />
                      <li key={name}>
                        <a
                          href={link}
                          // target="_blank"
                          rel="noopener noreferrer nofollow"
                        >
                          {name}
                        </a>
                        <a
                          href={link_affiliation}
                          target="_blank"
                          rel="noopener noreferrer nofollow"
                        >
                          <p style={subtitleStyle}>
                            &nbsp; &nbsp;
                            {subtitle}
                          </p>
                        </a>

                        <span className="darker">{description}</span>
                      </li>

                      <hr />
                    </div>
                  )
                )}
              </ul>
            </Row>
          </>
          <>
            <h3>{SOCIAL.title}</h3>

            <Row className="uses-intro" style={{ marginTop: 30 }}>
              {SOCIAL.data.map((s) => (
                <Col
                  md={2}
                  xs={4}
                  key={s.link}
                  style={{ textAlign: "center", marginBottom: 40 }}
                >
                  <Icon stack={s.platform} />
                  <div className="stack-name">
                    <a href={s.link} target="_blank" rel="noopener noreferrer">
                      {s.platform}
                    </a>
                  </div>
                </Col>
              ))}
            </Row>
          </>
          <InviteBox />
          <hr />
          <Row className="uses-intro">
            <Col>
              Follow me on{" "}
              <a
                href={`https://twitter.com/DylanAlbertazzi`}
                target="_blank"
                rel="noopener noreferrer nofollow"
              >
                Twitter
              </a>
              . That's where I usually hangout.
            </Col>
          </Row>
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
