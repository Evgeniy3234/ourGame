import React, { useEffect, useState } from "react";
import axios from "axios";
import style from "./profile.module.css";
import moment from 'moment';

export default function Profile({ user }) {
  const [games, setGames] = useState([]);
 
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.post(
        `http://localhost:3001/profile/${user.id}`,
        {},
        { withCredentials: true }
      );
      console.log("games", response.data.games);
      setGames(response.data.games);
    };
    fetchData();
  }, []);

  return (
    <div className={style.mainProfile}>
      <h3>Hello, {user.name}!</h3>
      <p>Статистика игр:</p>
      {games.map((game) => {
const mom = moment(game.createdAt).format("MMM Do YY");    
console.log('moment', mom);
        return (
          <div className={style.points}>
            <span className={style.number}>{game.total}</span>
            <span className={style.text}>очков</span>
            <span className={style.date}>{mom}</span>
          </div>
        );
      })}
    </div>
  );
}
