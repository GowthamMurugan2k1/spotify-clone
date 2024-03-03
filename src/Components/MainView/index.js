'use client'
import styles from './mainView.module.css';
import NavBar from '../NavBar';
import { Greetings } from '@/utils/common_Utility';
import FeaturedPlaylist from './featured_Playlist';
import Album from './Album';
import { useContext } from 'react';
import UserContext from '@/store/UserContext';
import Loginscreen from '../Loginscreen'

function index() {
    const { isAccessToken } = useContext(UserContext)
    return (
        <div className={styles.MainContainer}>
            <div className={styles.Innercontaier}>
                <NavBar />
                <div className={styles.Quick_play} style={{ width: isAccessToken ? 'fit-content' : '100%', paddingRight: isAccessToken ? "13px" : '0px' }}>
                    {isAccessToken && <div className={styles.GreetingDiv}>
                        <h2 className={styles.TimeGreet}>{Greetings()}</h2>
                    </div>}
                    {isAccessToken ? <>
                        <FeaturedPlaylist />
                        <Album />
                    </> : <Loginscreen />}
                </div>
            </div>
        </div>
    )
}

export default index