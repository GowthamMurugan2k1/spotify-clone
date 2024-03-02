'use client'
import Image from "next/image";
import styles from './LoginScreen.module.css'
import { HandleSignIN } from "../NavBar";
import { useContext } from "react";
import UserContext from "@/store/UserContext";
import { useRouter } from "next/router";

function index() {
  
    const {isAccessToken,setAccessToken} = useContext(UserContext)
    const handleSignIn = ()=>{
        HandleSignIN(isAccessToken,setAccessToken)
      
        
    }
    return (
        <div className={styles.LoginContainer}>
            <Image src={'/images/loginchart.svg'} width={400} height={100} draggable='false'/>
            <button className="bg-slate-500 text-blue-50 p-5 rounded-lg" onClick={()=>{handleSignIn(); window.location.reload()}}>Sign In as a Guest</button>
        </div>
    )
}

export default index