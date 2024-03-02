'use client'
import { useContext, useEffect, useState } from 'react';
import CardList from '../../Card/CardList';
import UserContext from '@/store/UserContext';
import axios from 'axios';
import styles from '../featured_Playlist/featured.module.css';

const index = () => {
  const { isAccessToken } = useContext(UserContext);
  const [albumData, setalbumData] = useState([])

  useEffect(() => {
    if (!isAccessToken) {
      return
    }
    const getProfile = async () => {
      const response = await axios.get(`albums?ids=382ObEPsp2rxGrnsizN5TX%2C1A2GTWGtFfWp7KSQTwWOyo%2C58colQLIZDAInrHq3eT2PF%2C4X8f6Xj3EHnv6haTEByM3X&market=IN`)
      const { albums } = response.data;
      setalbumData(albums)
  
    }
    getProfile()

  }, [isAccessToken])


  return (
    <>
      <div className={styles.albumContainer}>
        <h2 id={styles.SectionName}> Your top Albums</h2>
        <CardList CardData={albumData} />
      </div>
    </>
  )
}
export default index