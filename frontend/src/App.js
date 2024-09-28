import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EnterCode from "./components/Pages/EnterCode/EnterCode";
import MainPage from "./components/Pages/MainPage/MainPage";
import TopNavBar from "./components/Functions/TopNavBar/TopNavBar";


class App extends Component {

  render() {
    return (
      <Router>
        <TopNavBar/>
        <Routes>
          <Route path="/" element={<EnterCode/>} />
          <Route path="/MainPage" element={<MainPage/>}/>
        </Routes>
      </Router>
    );
  }
}

export default App;
