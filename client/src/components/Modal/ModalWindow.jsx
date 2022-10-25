import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { useEffect } from 'react';
import axios from 'axios';


export default function ModalWindow({isModalOpen, handleCancel, el, game, count }) {
console.log('game from model window', game);
const [answer, setAnswer] = useState({});

const answerHandler = (event) => {
  setAnswer((prev) => ({...prev, [event.target.name]: event.target.value }));
  // console.log(answer);
}

const checkAnswer = async () => {
  // console.log('element', el);
  const res = await axios.post('http://localhost:3001/game/check', {answer, el, game}, {withCredentials: true})
  // console.log('response', res);
  if (res.data === 'правильно') {
    handleCancel()
    alert('ответ верный')
  } else {
    handleCancel()
    alert('ответ неверный')
  }

}

  return (
    <>
    <Modal title="Basic Modal" open={isModalOpen} onOk={checkAnswer} onCancel={handleCancel}>
      <p>{el.question}</p>
      <p>Оставшееся время {count} секунд</p>
      <input 
      name="answer"
      value={answer.answer}
      onChange={(e) => answerHandler(e)}>
      </input>
    </Modal>
  </>
  )
}
