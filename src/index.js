import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import ValidatedSignupForm from "./ValidatedSignupForm";

function App() {
  return (
    <div className="App">
      <h1>Validated Signup Form for Raisely</h1>
      <ValidatedSignupForm />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
