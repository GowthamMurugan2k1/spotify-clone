'use client'
import styles from "./NavBar.module.css";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { HiOutlineBell } from "react-icons/hi2";
import { RxAvatar } from "react-icons/rx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleDown } from "@fortawesome/free-regular-svg-icons";
import '@fortawesome/fontawesome-svg-core/styles.css'
import axios from "axios";
import { setCookie } from 'cookies-next';
import { useContext, } from "react";
import UserContext from "@/store/UserContext";


const index = ({colorCode}) => { 
    const {isAccessToken,setAccessToken} = useContext(UserContext)

   
    
    return (
        <div className={styles.Nav_Container} style={{background:colorCode}}>
            <div className={styles.LeftContent}>
                <button >
                    <IoIosArrowBack />
                </button>
                <button>
                    <IoIosArrowForward />
                </button>
            </div>
            <div className={styles.RightContent}>
                <button className={styles.Explore}>Explore premium</button>
                <button className={styles.PWABTn}>
                    <span> <FontAwesomeIcon icon={faCircleDown} size="lg" /></span>
                    install App
                </button>
                <button className={styles.Notification}>
                    <HiOutlineBell />
                </button>
                <button className={styles.Avatar} onClick={()=>HandleSignIN(isAccessToken,setAccessToken)}>
                    {isAccessToken ? <RxAvatar /> :
                        "sign In"}
                </button>
            </div>
        </div>
    );
};

export default index;

export const HandleSignIN = async ({isAccessToken,setAccessToken,}) => {
    if(isAccessToken){
        return
    }
    try {
        let body = new URLSearchParams({
            'grant_type': 'client_credentials',
        })
        const req = await axios.post(`https://accounts.spotify.com/api/token`, body, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + (Buffer.from(process.env.NEXT_PUBLIC_Client_ID + ':' + process.env.NEXT_PUBLIC_Client_Secret).toString('base64')),
            },
        })
        const { access_token, expires_in } = req.data;
        setCookie('accesstoken', access_token, { maxAge: expires_in })
        setAccessToken(access_token)
       
    } catch (error) {
        console.log(error, 'error')
    }
}