import React, { useState, useEffect } from "react";
import { Grid, Row, Col } from "react-flexbox-grid";
import { Sun, Moon } from "react-feather";
import Link from "next/link";
import simpleIcons from "simple-icons";

const menu = [
  {
    path: "/",
    name: "start",
  },
  {
    path: "/about",
    name: "about",
  },
  {
    path: "/blog",
    name: "blog",
  },
  {
    path: "/resume",
    name: "resume",
  },
  // {
  //   path: "/uses",
  //   name: "uses",
  // },
];

export function InviteBox() {
  return (
    <div
      className="twitter-border "
      style={{
        backgroundSize: "90px",
        backgroundPosition: "105% 180%",
        backgroundRepeat: "no-repeat",
      }}
    >
      
      Reach out via{ " " }
      <a
        href="mailto: d.albertazzi10@gmail.com"
        target="_blank"
        rel="noopener noreferrer nofollow"
      >
        Email
      </a>.
    </div>
  );
}

export const Icon = ({ stack, style }) => {
  const icon = simpleIcons.get(stack);

  return (
    <div
      data-icon={stack}
      style={{
        fill: `#${icon.hex}`,
        display: "inline-block",
        width: "50px",
        margin: "0 auto",
        ...style,
      }}
      dangerouslySetInnerHTML={{ __html: icon.svg }}
    />
  );
};

function Layout({ children, isHomepage, secondaryPage, noHead = false }) {
  const onLoadTheme =
    typeof localStorage !== "undefined" && localStorage.getItem("BLOG_THEME");
  const [theme, setTheme] = useState(onLoadTheme);
  const [mounted, setMounted] = useState(false);
  const switchTheme = () => {
    const setTo = theme === "dark" ? "light" : "dark";

    setTheme(setTo);
  };

  useEffect(() => {
    if (onLoadTheme) return;

    // if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    //   setTheme("dark");
    // }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);

    localStorage.setItem("BLOG_THEME", theme);

    setMounted(true);
  }, [theme]);

  const containerProps = {
    ...(isHomepage && { md: 12 }),
    ...(!isHomepage && { md: 8, mdOffset: 2 }),
  };

  if (!mounted) return <div />;

  return (
    <>
      <div className="top-menu">
        <Row>
          <Col xs={10}>
            <ul>
              <li className="logo">
                <Link href="/" as="/">
                  <a>⧩</a>
                </Link>
              </li>

              {menu.map(({ path, name }) => (
                <li key={name}>
                  <Link href={path} as={path}>
                    <a>{name}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </Col>

          <Col xs={2} style={{ textAlign: "right" }}>
            <button
              className="theme-switch-button"
              onClick={() => switchTheme()}
            >
              {theme === "dark" ? <Sun /> : <Moon />}
            </button>
          </Col>
        </Row>
      </div>

      <Grid>
        <Row>
          <Col {...containerProps}>
            {!secondaryPage && (
              <h1
                className={`blog-title`}
                style={isHomepage && { textAlign: "left" }}
              >
                Dylan Albertazzi
              </h1>
            )}

            {children}
          </Col>
        </Row>
      </Grid>

      <footer>
        &copy; {new Date().getFullYear()} Code hosted on{" "}
        <a
          className="dotted-link"
          href={`https://github.com/dylan-albertazzi/Dylan-Website`}
        >
          Github
        </a>{" "}
        🤖{" "}
      </footer>
    </>
  );
}

export default Layout;
