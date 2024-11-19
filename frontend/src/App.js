import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EnterCode from "./components/Pages/EnterCode/EnterCode";
import MainPage from "./components/Pages/MainPage/MainPage";
import CreateClient from "./components/Pages/CreateClient";
import EditExistingClient from "./components/Pages/EditExistingClient";
import TopNavBar from "./components/Functions/TopNavBar/TopNavBar";
import Draft from './components/Pages/DraftPage/DraftPage';
class App extends Component {

  render() {
    return (
      <Router>
        <TopNavBar/>
        <Routes>
          <Route path="/" element={<EnterCode/>} />
          <Route path="/MainPage" element={<MainPage/>}/>
          <Route path="/draft" element={<Draft/>} />
          <Route path="/create-client" element={<CreateClient />} />
          <Route path="/edit-existing-client" element={<EditExistingClient />} />
        </Routes>
      </Router>
    );

  }
}

export default App;