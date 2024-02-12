import React from 'react'
import styles from "../styles/home.module.scss";
import CatSection from './CatSection';
import HottestSection from './HottestSection';


const Home = () => {
  return (
    <div className={styles.Wrapper}>
    <CatSection/>
    <HottestSection/>
    </div>
  )
}

export default Home