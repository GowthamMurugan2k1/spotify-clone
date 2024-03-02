"use client";

import axios from "axios";
import { useContext, useEffect, useState } from "react";
import styles from "./playlist.module.css";
import Navbar from "../../../Components/NavBar";
import { ColorExtractor } from "react-color-extractor";
import Listview from "../../../Components/ListView";
import UserContext from "@/store/UserContext";
import Loginscreen from "../../../Components/Loginscreen";
import { updateFetchOptions } from "@/utils/common_Utility";

const index = (params) => {
  const { isAccessToken } = useContext(UserContext);
  const [ImageUrl, setImageurl] = useState(null);
  const [playlist_Data, setplaylist_Data] = useState([]);
  const [colorCode, setcolorCode] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const { playlistid } = params.params;

  useEffect(() => {
    if (!isAccessToken) {
      return;
    }
    const getPlaylistinfo = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}playlists/${playlistid}`,
          updateFetchOptions({ method: "get" })
        )
        const Response = await res.json() 
        const { images } = Response;
        setplaylist_Data(Response);
        const src = images[0]["url"];
        setImageurl(src);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    getPlaylistinfo();
  }, [playlistid, isAccessToken]);

  const handleGetColor = (color) => {
    setcolorCode(color);
  };

  const { type, description, name, primary_color, tracks, followers } =
    playlist_Data;
  if (isLoading && isAccessToken) {
    return <h1 style={{ color: "#fff" }}>Loading....</h1>;
  }

  return (
    <>
      <div className={styles.Container}>
        <div className={styles.InnerCont}>
          <Navbar colorCode={colorCode !== null ? colorCode[0] : ""} />
          {isAccessToken ? (
            <>
              <div
                className={styles.BannerContainer}
                style={{ background: colorCode !== null ? colorCode[0] : "" }}
              >
                <div className={styles.GradientEffect} />
                <div className={styles.imageCorner}>
                  <ColorExtractor getColors={handleGetColor}>
                    {ImageUrl &&<img src={ImageUrl} className={styles.imageStyle} alt={name}/>}
                  </ColorExtractor>
                </div>
                <div className={styles.ContentCorner}>
                  <p className={styles.type}>{type}</p>
                  <h1>{name}</h1>
                  <p style={{ color: "#f5f5f5" }}>{description}</p>
                  <p
                    style={{ color: "#f5f5f5" }}
                  >{`${followers?.total} likes.${tracks?.items?.length} songs`}</p>
                </div>
              </div>
              {tracks?.items && (
                <Listview
                  AudioData={tracks?.items}
                  colorCode={colorCode !== null ? colorCode[0] : ""}
                />
              )}
            </>
          ) : null}
        </div>
        {!isAccessToken && <Loginscreen />}
      </div>
    </>
  );
};

export default index;
