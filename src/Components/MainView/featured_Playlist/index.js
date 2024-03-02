'use client'
import { useContext, useEffect, useState } from 'react';
import CardList from '../../Card/CardList';
import UserContext from '@/store/UserContext';
import axios from 'axios';
import styles from './featured.module.css';

const index = () => {
  const { isAccessToken } = useContext(UserContext);
  const [FeaturedData, setFeaturedData] = useState([])

  useEffect(() => {
    if (!isAccessToken) {
      return
    }
    const getRecommendation = async () => {
      const res = await axios.get(`browse/featured-playlists?locale=IN`)
      const { playlists
      } = res.data;
      setFeaturedData(playlists.items)

    }
    getRecommendation()

  }, [isAccessToken])


  return (
    <>
      <div className={styles.FeatureContainer}>
        <h2 id={styles.SectionName}> Try Something else</h2>
        <CardList CardData={FeaturedData} />
      </div>
    </>
  )
}
export default index