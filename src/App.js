import React, { useState } from "react";
import "./App.scss";
import Header from "./components/Header/Header";
import Title from "./components/Title/Title";
import GETrequest from "./components/GETrequest/GETrequest";
import POSTrequest from "./components/POSTrequest/POSTrequest";

export default function App() {
  const [render, setRender] = useState(0);

  return (
    <div className="App ">
      <Header />
      <Title />
      <GETrequest render={render} />
      <POSTrequest render={render} setRender={setRender} />
    </div>
  );
}
