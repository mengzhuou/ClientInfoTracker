import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateClient from "./components/Pages/CreateClient";
import EditExistingClient from "./components/Pages/EditExistingClient";
import Main from "./components/Pages/MainPage/MainPage";
import TopNavBar from "./components/Functions/TopNavBar/TopNavBar";
import Draft from './components/Pages/DraftPage/DraftPage';
class App extends Component {

  render() {
    return (
      <Router>
        <TopNavBar/>
        <Routes>
          <Route path="/" element={<Main/>} />
          <Route path="/draft" element={<Draft/>} />
          <Route path="/create-client" element={<CreateClient />} />
          <Route path="/edit-existing-client" element={<EditExistingClient />} />
        </Routes>
      </Router>
    );

  }
}

export default App;