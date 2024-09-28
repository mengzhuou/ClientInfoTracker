import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./components/Pages/MainPage/MainPage";
import TopNavBar from "./components/Functions/TopNavBar/TopNavBar";
import DraftPage from './components/Pages/MainPage/DraftPage/DraftPage';
class App extends Component {

  render() {
    return (
      <Router>
        <TopNavBar/>
        <Routes>
          <Route path="/" element={<Main/>} />
          <Route path="/draft" element={<DraftPage />} />
        </Routes>
      </Router>
    );
    
  }
}

export default App;