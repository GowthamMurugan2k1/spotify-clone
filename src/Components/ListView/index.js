"use client";
import styles from "./Listview.module.css";
import { IoTimeOutline } from "react-icons/io5";
import CustomeIcon from "../CustomeIcons";
import { FaList } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import Image from "next/image";
import moment from "moment";
import { msToDuration } from "@/utils/common_Utility";
import { IoMdPlay } from "react-icons/io";
import { useContext, useState } from "react";
import SongPlayContext from "@/store/SongPlayContext";

const index = ({ AudioData, colorCode, type, ImageUrl }) => {
  const { setSongDetails, SongDetails, isPlaying, setisPlaying } = useContext(SongPlayContext);
  const [isMouseOverID, setisMouseOverID] = useState(null);

  const handlePlaySong = (Data) => {
    const { artists, preview_url, name, id, album } = Data;

    let updateSongData = {
      image: type !== "album" ? album.images[0]['url'] : ImageUrl,
      title: name || "",
      audio: preview_url,
      artist: artists,
      id: id
    };
    setSongDetails(updateSongData);
  };

  // PlayPause Button 
  const HandlePlayPauseBTN = () => {
    setisPlaying(!isPlaying)
  }

  const UpdateSongdetails = (track) => {
    handlePlaySong(track)
    setisPlaying(true)
  }

  return (
    <section className={styles.Container} style={{ height: SongDetails.id ? type === 'album' ? 'fit-content':'90vh' : 'fit-content' }}>
      <div className={styles.ColorCodeDiv} style={{ background: colorCode }} />
      <div className={styles.GradientEffect} />
      <div className={styles.headSection}>
        <div className={styles.leftContent}>
          <ul>
            <li>
              <CustomeIcon staticView isplaying={SongDetails.id ? isPlaying : false} HandlePlayPauseBTN={HandlePlayPauseBTN} />
            </li>
            <li>
              <FaRegHeart />
            </li>
            <li>
              <HiOutlineDotsHorizontal />
            </li>
          </ul>
        </div>
        <div className={styles.rightContent}>
          List <FaList />
        </div>
      </div>
      <table className={styles.table}>
        <tbody>
          <tr>
            <th id={styles.th}>#</th>
            <th id={styles.th}>Title</th>
            {type !== "album" && <th id={styles.th}>album</th>}
            {type !== "album" && <th id={styles.th}>Date added</th>}
            <th id={styles.th} style={{ fontSize: "20px" }}>
              <IoTimeOutline />
            </th>
          </tr>

          {type !== "album" &&
            AudioData.map((item, i) => {
              const { added_at, track } = item;
              const { album, artists, duration_ms, name, id } = track;
              return (
                <tr
                  className={styles.listCard}
                  onMouseEnter={() => setisMouseOverID(id)}
                  onMouseLeave={() => setisMouseOverID(null)}
                  onClick={() => UpdateSongdetails(track)}
                  key={id}
                >
                  <td id={styles.td}>
                    {isMouseOverID === id ? (
                      <IoMdPlay style={{ color: "#fff", position: 'absolute', top: '50%', translate: "0 -50%" }} />
                    ) : (
                      `${i + 1}`
                    )}
                  </td>
                  <td id={styles.td} className={styles.TitleContent}>
                    {type !== "album" && (
                      <Image
                        src={album.images[2]["url"]}
                        height={album.images[2]["height"]}
                        width={album.images[2]["width"]}
                        alt={album?.name}
                        className="rounded-md"
                      />
                    )}
                    <span className={styles.TitleInfoView}>
                      <p className={styles.NameOFTitle}>{name}</p>
                      <p>
                        {artists.map((val) => {
                          return `${val.name},`;
                        })}
                      </p>
                    </span>
                  </td>
                  <td id={styles.td}>{album?.name}</td>
                  <td id={styles.td}>
                    {moment(added_at).startOf("hour").fromNow()}
                  </td>
                  <td id={styles.td}>{msToDuration(duration_ms)}</td>
                </tr>
              );
            })}
          {type === "album" &&
            AudioData.map((item, i) => {
              const { artists, duration_ms, name, id } = item;

              return (
                <tr
                  className={styles.listCard}
                  onMouseEnter={() => setisMouseOverID(id)}
                  onMouseLeave={() => setisMouseOverID(null)}
                  onClick={ () => UpdateSongdetails(item)}
                  key={id}
                >
                  <td id={styles.td}>
                    {isMouseOverID === id ? (
                      <IoMdPlay style={{ color: "#fff", position: 'absolute', top: '50%', translate: "0 -50%" }} />
                    ) : (
                      `${i + 1}`
                    )}
                  </td>
                  <td id={styles.td} className={styles.TitleContent}>
                    <span className={styles.TitleInfoView}>
                      <p className={styles.NameOFTitle}>{name}</p>
                      <p>
                        {artists.map((val) => {
                          return `${val.name},`;
                        })}
                      </p>
                    </span>
                  </td>

                  <td id={styles.td}>{msToDuration(duration_ms)}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </section>
  );
};

export default index;
