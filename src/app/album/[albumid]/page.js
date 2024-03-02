'use client'

import axios from "axios";
import { useContext, useEffect, useState } from "react";
import styles from '../../playlist/[playlistid]/playlist.module.css';
import Navbar from '../../../Components/NavBar'
import { ColorExtractor } from "react-color-extractor";
import Listview from '../../../Components/ListView'
import UserContext from "@/store/UserContext";
import Loginscreen from '../../../Components/Loginscreen';

const index = (params) => {
  const { isAccessToken } = useContext(UserContext)
  const [ImageUrl, setImageurl] = useState(null)
  const [Album_Data, setAlbum_Data] = useState([])
  const [colorCode, setcolorCode] = useState(null)
  const[ isLoading , setLoading] = useState(true)
  const { albumid } = params.params;


  useEffect(() => {
    if (!isAccessToken) {
      return
    }
    try{

      const getAlbuminfo = async () => {
        setLoading(true)
        const res = await axios.get(`albums/${albumid}?market=IN`)
        const { images } = res.data
        setAlbum_Data(res.data)
        
        const src = images[0]['url']
        setImageurl(src)
        setLoading(false)
      }
      getAlbuminfo()
    }catch(e){
      console.log(e,'error')
    }
    }, [albumid, isAccessToken])

  const handleGetColor = (color) => {
    setcolorCode(color)
  }

  
  
  
  const { album_type, description, name, primary_color, tracks,artists,release_date,total_tracks  } = Album_Data
  if(isLoading && isAccessToken){
    return <h1 style={{color:'#fff'}}>Loading....</h1>
  }
  return (
    <>
      <div className={styles.Container} >
        <div className={styles.InnerCont}>
          <Navbar colorCode={colorCode !== null ? colorCode[0] : ''} />
          {isAccessToken ? <>
            <div className={styles.BannerContainer} style={{ background: colorCode !== null ? colorCode[0] : '' }}>
              <div className={styles.GradientEffect} />
              <div className={styles.imageCorner}>
                <ColorExtractor getColors={handleGetColor}>
                {ImageUrl &&  <img src={ImageUrl} className={styles.imageStyle} alt={name}/>}
                </ColorExtractor>
              </div>
              <div className={styles.ContentCorner}>
                <p className={styles.type}>{album_type}</p>
                <h1>{name}</h1>
                <p style={{ color: '#f5f5f5' }}>{description}</p>
                <p style={{ color: '#f5f5f5' }}>{artists?.map((items)=>{return `${items.name}`}) + "."+`${release_date?.split('-')[0]}.${total_tracks} songs.`}</p>
              </div>
            </div>
            {tracks && <Listview AudioData={tracks?.items} colorCode={colorCode !== null ? colorCode[0] : ''} type={'album'} ImageUrl={ImageUrl}/>}
          </> : null}
        </div>
        {!isAccessToken && <Loginscreen />}
      </div>
    </>
  )
}

export default index