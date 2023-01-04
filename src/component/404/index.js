import React from "react";
import { Link } from "react-router-dom";

import "./index.css";

function NoMatch() {
  return (
    <div className="no-match">
      <svg
        width="46"
        height="46"
        viewBox="0 0 46 46"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M23 0C10.298 0 0 10.297 0 23c0 12.702 10.298 23 23 23 12.703 0 23-10.298 23-23C46 10.297 35.703 0 23 0zm0 44C11.421 44 2 34.579 2 23S11.42 2 23 2c11.579 0 21 9.42 21 21 0 11.579-9.42 21-21 21zm1.872-32.065l-.8 16.192h-2.144l-.832-16.192h3.776zm-3.968 20.768c0-.576.203-1.072.608-1.488a1.979 1.979 0 011.472-.624c.576 0 1.072.208 1.488.624.416.416.624.912.624 1.488s-.208 1.067-.624 1.472a2.056 2.056 0 01-1.488.608 2.006 2.006 0 01-1.472-.608 2.002 2.002 0 01-.608-1.472z"
          fill="currentColor"
        ></path>
      </svg>
      <h1>Something went wrong</h1>
      <p>Go to home page</p>
      <Link to="/">HOME PAGE</Link>
    </div>
  );
}

export default NoMatch;
