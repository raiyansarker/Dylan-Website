import React from "react";

import Layout from "../components/Layout";
// import { Resume } from "../constants/Resume";

function Resume({ og }) {
  return (
    <>
      <Layout secondaryPage>
        <h1 className="uses-h1">Resume</h1>

        {/* <div className="twitter-border, uses-intro ">
          I occasionally get asked about my setup, so here it is.
        </div> */}

       
       <iframe src="/images/Resume-For-Website.pdf" height="700px" width="100%"></iframe>
        
  

        
      </Layout>
      
    </>
  );
}

Resume.getInitialProps = () => {
  return {
    data: {
      og: {
        description: "What Dylan uses on a daily basis.",
        image: "https://telmo.im/og/uses.png",
      },
    },
  };
};

export default Resume;
