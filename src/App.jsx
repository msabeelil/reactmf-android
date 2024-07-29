import React from "react";
import ReactDOM from "react-dom";
import Button from "./Button";
import "./index.css";




const App = () => (
  <div className="container">
    <div>Name: react-remote-microfrontend </div>
    {/* <div>Framework: react</div>
    <div>Language: JavaScript</div>
    <div>CSS: Empty CSS</div> */}
    <Button />
    
  </div>


);
// window.emitEvent=emitEvent;

ReactDOM.render(<App />, document.getElementById("app"));


