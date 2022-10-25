import React,{useState} from 'react';
import styles from '../Game/game.module.css'
import ModalWindow from "../Modal/ModalWindow"
import 'antd/dist/antd.css';  


export default function Box({el, setModalQuestion, game}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [color, setColor] = useState('rgb(18, 36, 81)')
  const [count, setCount] = useState(30);

  const showModal = () => {
    if(color !== 'grey') {
    setIsModalOpen(true);
    setColor('grey')
   const timer = setInterval(()=>{
    setCount((prev) => prev - 1 )
    },1000)
    setTimeout(()=> {
      setIsModalOpen(false);
      clearInterval(timer);
    }, 30000)

  }
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
    <ModalWindow game={game} el={el} isModalOpen={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} count={count} />
    <th onClick={showModal} style={{backgroundColor: color}} className={styles.box}>{el.value}</th>
    </>
  )
}