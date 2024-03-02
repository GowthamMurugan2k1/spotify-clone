import { IoMdPlay } from "react-icons/io";
import styles from "./CustomeIcons.module.css";
import { IoPause } from "react-icons/io5";

function index({ isMouseHover, id, staticView, isplaying,HandlePlayPauseBTN }) {
  return (
    <button
      className={
        isMouseHover === id
          ? `${styles.PlayBTN} ${styles.active}`
          : styles.PlayBTN
      }
      style={{
        visibility: staticView ? "visible" : "hidden",
        position: staticView ? "relative" : "absolute",
        bottom: staticView ? '0px' : '5px',
        right: staticView ? '0px' : '10px'
      }}
      onClick={HandlePlayPauseBTN}
    >
      {isplaying ? <IoPause /> : <IoMdPlay />}
    </button>
  );
}

export default index;
