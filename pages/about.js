import React, { useState, useEffect } from "react";
import { Row, Col } from "react-flexbox-grid";
import dynamic from "next/dynamic";
import { config } from "react-spring";

const TextTransition = dynamic(() => import("react-text-transition"), {
  ssr: false,
});

import Layout from "../components/Layout";
import Icon from "../components/Icon";
import { PRESENT, SKILLS, CERTIFICATIONS } from "../constants/Stack";
import { AFFILIATIONS } from "../constants/Uses";


function About() {
  const [index, setIndex] = useState(0);
  const avatar = `/images/Avatar.jpg`;

  var subtitleStyle = {
  color: "#222",
  marginTop: "0px",
  };
  
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
            <h3>My daily stack</h3>
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
            <>
            <h2>{CERTIFICATIONS.title}</h2>
            <Row style={{ marginTop: 30 }}>
              <ul
                className="uses-list"
                style={{ marginTop: "0px", marginBottom: "0px" }}
              >
                {CERTIFICATIONS.data.map(
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
                          borderStyle: "none",
                         
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
                            <br />
                          {/* <p style={subtitleStyle}>
                             &nbsp;
                            {subtitle}
                          </p> */}
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
           
            <Row>
              <Col md={12}>
                <h3>A bit more about me...</h3>
                I started coding because of my desire to run a business. I know
                lots of people say they want to run a business, but it’s a true
                fascination for me. I spent my high school years coming home
                from baseball practice to read business books until I fell
                asleep. It’s just this desire deep down in me that it feels like
                I was made for.
                <br />
                <br />
                Through trial and error, I realized that the best way for me to
                start a business is online. It’s best because all you need is a
                computer, no investment or special equipment. That was over six
                years ago and since then I’ve gotten to work on a lot of cool
                things, some of which you can read about on the start page.
                <br />
                <br />
                I focus on web development because it’s so tangible. If other
                people can’t get your idea it’s useless. It lights me up to
                bridge the gap from the elusive and smokey realm of ideas to the
                concrete and understandable place of reality. Where others can
                tangibly interact with an idea and make their life better
                because of it.
                <br />
                <br />
                When I’m not coding I’m spending time in Corvallis, OR with my
                wife and our friends. My favorite time of year is June when the
                days are long and the sunsets are colorful.
              </Col>
            </Row>
            <hr />
            {AFFILIATIONS.map(({ title, stack }) => (
              <>
                <h3>{title}</h3>
                <ul
                  style={{ marginTop: "0px" }}
                  className="uses-list"
                  key={title}
                >
                  {stack.map(({ name, description, link }) => (
                    <li key={name}>
                      <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                      >
                        {name}
                      </a>
                      <span>{description}</span>
                    </li>
                  ))}
                </ul>
              </>
            ))}
            
         
          </div>
        </div>
      </Layout>
    </>
  );
}

export default About;
