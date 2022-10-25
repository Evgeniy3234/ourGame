import React, {useEffect, useState} from 'react'
import styles from './game.module.css'
import Box from '../Box/Box'
import axios from 'axios';
import PacmanLoader from "react-spinners/PacmanLoader";



export default function Game({user, game}) {
console.log('user from game', user);
console.log('game from game', game);
  const [questions, setQuestions] = useState([]);
  const [modalQuestion, setModalQuestion ] = useState({});
  const [loading, setLoading] = useState(true);

  const questionFilterHandler = () => {

  }

  useEffect(() => {
  axios.get('http://localhost:3001/game', {withCredentials: true})
  .then((res)=>{
    setQuestions(res.data)
    setLoading(false)
  })
  
  }, [])

// console.log('questions',questions);


  return (

    <div className={styles.main}>
      {loading ? <PacmanLoader  color='rgb(18, 36, 81)'/> : 
    <><h1>Своя игра</h1><table className={styles.table}>
          <tr className={styles.row}>
            <td className={styles.category}>География</td>
            {questions
              .filter((el) => el.category === "geography")
              .map((el) => <Box game={game} el={el} key={el.id} setModalQuestion={setModalQuestion}/>)}

          </tr>
          <tr className={styles.row}>
            <td className={styles.category}>Литература</td>
            {questions
              .filter((el) => el.category === "literature")
              .map((el) =>  <Box game={game} el={el} key={el.id} setModalQuestion={setModalQuestion}/>)}
          </tr>
          <tr className={styles.row}>
          <td className={styles.category}>Физика</td>
            {questions
              .filter((el) => el.category === "physics")
              .map((el) =>  <Box game={game} el={el} key={el.id} setModalQuestion={setModalQuestion}/>)}
          </tr>
          <tr className={styles.row}>
          <td className={styles.category}>История</td>
            {questions
              .filter((el) => el.category === "history")
              .map((el) =>  <Box game={game} el={el} key={el.id} setModalQuestion={setModalQuestion}/>)}
          </tr>
        </table></>
    }
    </div>
  );
}

