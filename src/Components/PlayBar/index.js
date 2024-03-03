"use client";
import { useContext, useEffect, useRef, useState } from "react";
import styles from "./PlayBar.module.css";
import SongPlayContext from "@/store/SongPlayContext";
import Image from "next/image";
import Controller from "../Controller/index";

const index = () => {
    const { SongDetails } = useContext(SongPlayContext);
    const AudioRef = useRef(null);
    const [currentTime, setCurrentTime] = useState(0);

    // Destructure of SongDetails
    const { artist, audio, id, image, title } = SongDetails;
    
 
    return (
        <section
            className={styles.wrapper}
            style={{ display: !SongDetails.id ? "none" : "" }}
        >
            <div className={styles.leftContainer}>
                <div className={styles.ImageContent}>
                    {image &&<Image
                        src={image}
                        alt={title}
                        width={60}
                        height={60}
                        style={{ borderRadius: "8px" }}
                    />}
                </div>
                <span className="gap-2 flex flex-col w-1/3">
                    <h5 className="font-normal text-[length:var(--encore-text-size-smaller)] text-nowrap">
                        {title}
                    </h5>
                    {artist.length <= 2 && (
                        <p className="text-[color:var(--text-subdued)] text-[length:var(--encore-text-size-smaller-2)] text-nowrap">
                            {artist.map((item) => {
                                return `${item.name}`;
                            })}
                        </p>
                    )}
                    <span className={`${styles.marquee_container} text-[length:var(--encore-text-size-smaller-2)] text-nowrap`}>
                        {artist.length > 2 && (
                            <p>
                                {artist.map((item) => {
                                    return `${item.name},`;
                                })}
                            </p>
                        )}
                    </span>
                </span>
            </div>
            <div className={styles.middleContainer}>
                <audio
                    autoPlay={true}
                    src={audio}
                    ref={AudioRef}
                    style={{ display: "none" }}
                    onTimeUpdate={() => {
                        setCurrentTime(AudioRef?.current?.currentTime);
                    }}
                    
                />
                <Controller
                    AudioRef={AudioRef}
                    currentTime={currentTime}
                    setCurrentTime={setCurrentTime}
                    id={id}
                />
            </div>
            <div className={styles.righttContainer}></div>
        </section>
    );
};

export default index;
