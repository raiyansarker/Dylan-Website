import React, { useState, useEffect } from "react";
import { Row, Col } from "react-flexbox-grid";
import dynamic from "next/dynamic";
import { config } from "react-spring";

const TextTransition = dynamic(() => import("react-text-transition"), {
  ssr: false,
});

import Layout from "../components/Layout";
import Icon from "../components/Icon";
import { PRESENT, SKILLS } from "../constants/Stack";

function About() {
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
                I'm a full-stack engineer. I've been coding for 6+ years and
                have loved every day of it.
                <br />
                <br />
                I've worked with small businesses, startups, and research labs.
              </Col>
            </Row>
            <hr />
            <h3>What I've worked with so far</h3>
            <Row style={{ marginTop: 30 }}>
              {PRESENT.map((s) => (
                <Col
                  md={2}
                  xs={4}
                  key={s}
                  style={{ textAlign: "center", marginBottom: 40 }}
                >
                  <Icon type={s} />
                  <div className="stack-name">{s}</div>
                </Col>
              ))}
            </Row>
            <hr />
            Follow me on{" "}
            <a
              href="https://twitter.com/DylanAlbertazzi"
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              Twitter
            </a>
            . That's where I usually hangout.
          </div>
        </div>
      </Layout>
    </>
  );
}

export default About;
