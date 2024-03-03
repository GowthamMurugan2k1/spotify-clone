'use client'
import "./globals.css";
import SidebarComp from '../Components/sideBarComp';
import localFont from 'next/font/local'
import { UserContextProvider } from "@/store/UserContext";
import axios from "axios";
import { getCookie } from "cookies-next";
import PlayBar from '../Components/PlayBar'
import { SongPlayContextProvider } from "@/store/SongPlayContext";
import { useEffect, useState } from "react";

// const inter = Inter({ subsets: ["latin"] });
const Spotify_Circular = localFont({
  src: [{
    path: '../../public/Fonts/CircularSpotifyText-Black.otf'
  },
  {
    path: '../../public/Fonts/CircularSpotifyText-BlackItalic.otf'
  },
  {
    path: "../../public/Fonts/CircularSpotifyText-Bold.otf"
  }, {
    path: "../../public/Fonts/CircularSpotifyText-Book.otf"
  }
  ],
  variable: '--font-circular'

})



export default function RootLayout({ children }) {
  const [AUTH_TOKEN, setAuthToken] = useState();

  useEffect(() => {
    const GET_AUTH_TOKEN = getCookie('accesstoken');
    setAuthToken(GET_AUTH_TOKEN)

  }, [AUTH_TOKEN])

  axios.defaults.baseURL = 'https://api.spotify.com/v1/';
  axios.defaults.headers.common["Authorization"] = `Bearer ${AUTH_TOKEN}`;
  return (
    <html lang="en" className={`${Spotify_Circular.variable} font-sans`}>
      <body >
        <SongPlayContextProvider>
          <UserContextProvider>
            <SidebarComp />
            {children}
            <PlayBar />
          </UserContextProvider>
        </SongPlayContextProvider>
      </body>
    </html>
  );
}
