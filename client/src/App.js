import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import SignUp from "./components/Signup/SignUp";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import Game from "./components/Game/Game";
import Profile from "./components/Profile/Profile";
import HomePage from "./components/HomePage/HomePage";
import axios from "axios";
import 'antd/dist/antd.css'; 

import "./App.css";



function App() {
  const [user, setUser] = useState({});

  const [game, setGame] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:3001/check", { withCredentials: true })
      .then((res) => setUser(res.data));
  }, []);

  return (
    <div className="App">
      <NavBar user={user} setUser={setUser} />
      <header className="App-header">

        <Routes>
        <Route
            path={`/profile/${user.id}`}
            element={<Profile user={user} />}
          />
        <Route
            path="*"
            element={<HomePage user={user} game={game} setGame={setGame}  />}
          />
          <Route
            path="/signup"
            element={<SignUp setUser={setUser} type="signup" />}
          />
          <Route
            path="/signin"
            element={<SignUp setUser={setUser} type="signin" />}
          />
          <Route
            path="/game"
            
            element={<Game user={user} game={game} />}
          />
        </Routes>

      </header>
      <Footer />
    </div>
  );
}

export default App;
