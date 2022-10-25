import React, { useState, useEffect } from "react";
import style from "./home.module.css";
import { Link, } from "react-router-dom";
import axios from "axios";

export default function HomePage({ user, game, setGame }) {
  console.log("user from homepage", user);

  const startGameHandler = async () => {
    const res = await axios.post("http://localhost:3001/game", user, {
      withCredentials: true,
    });
    console.log("newGame from homepage", res.data.newGameJson);
    setGame(res.data.newGameJson);
    console.log("game from state", game);
  };

  return (
    <div className={style.mainGame}>
      <h1>Своя игра</h1>
      {user.name ? (
          <Link
            className={style.startGameBtn}
            type="button"
            onClick={startGameHandler}
            to="/game"
          >
            НАЧАТЬ ИГРУ
          </Link>
      ) : (
        <></>
      )}
    </div>
  );
}
