import React from "react";

import Layout from "../components/Layout";
import { USES } from "../constants/Uses";

function Uses({ og }) {
  return (
    <>
      <Layout secondaryPage>
        <h1 className="uses-h1">What I use</h1>

        <div className="twitter-border, uses-intro ">
          I occasionally get asked about my setup, so here it is.
        </div>

        {USES.map(({ title, stack }) => (
          <ul className="uses-list" key={title}>
            <li className="head">{title}</li>

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
        ))}
      </Layout>
    </>
  );
}

Uses.getInitialProps = () => {
  return {
    data: {
      og: {
        description: "What Telmo uses on a daily basis.",
        image: "https://telmo.im/og/uses.png",
      },
    },
  };
};

export default Uses;
