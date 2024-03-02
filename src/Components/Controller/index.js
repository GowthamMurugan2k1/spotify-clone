"use client";
import VideoSlider from "./VideoSlider";
import { MdPlayCircle } from "react-icons/md";
import { HiMiniPauseCircle } from "react-icons/hi2";
import { useContext, useEffect, useState } from "react";
import styles from "./Controller.module.css";
import { FaForwardStep } from "react-icons/fa6";
import { FaBackwardStep } from "react-icons/fa6";
import SongPlayContext from "@/store/SongPlayContext";

const index = ({ AudioRef, currentTime, setCurrentTime, id }) => {
  const {isPlaying,setisPlaying} = useContext(SongPlayContext)

  const InitialPlayerInfo = {
    mute: false,
    volume: 100,
  };

  const [playerInfo, setPlayerInfo] = useState(InitialPlayerInfo);
  

  useEffect(() => {
    if (isPlaying) {
      AudioRef.current.play();
   
      setisPlaying(true);
    } else {
      AudioRef.current.pause();
      setisPlaying(false);
    
    }
  }, [isPlaying]);

  const handlePlayPauseBtn = () => {
    setisPlaying((prev) => !prev);
  };

  return (
    <div style={{ width: "100%" }}>
      <div className={styles.TopController}>
        <button className="text-[color:var(--text-subdued)] hover:text-white">
          <FaBackwardStep />
        </button>
        <button
          onClick={handlePlayPauseBtn}
          className="text-white bg-black text-[length:var(--button-size)] hover:scale-110"
        >
          {isPlaying ? <HiMiniPauseCircle /> : <MdPlayCircle />}
        </button>
        <button className="text-[color:var(--text-subdued)] hover:text-white">
          <FaForwardStep />
        </button>
      </div>
      <VideoSlider
        value={currentTime}
        AudioRef={AudioRef.current}
        setCurrentTime={setCurrentTime}
      />
    </div>
  );
};

export default index;
