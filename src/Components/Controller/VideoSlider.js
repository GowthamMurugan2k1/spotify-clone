import styles from "./Controller.module.css";
import "../../app/globals.css";
import ReactSlider from "react-slider";

const VideoSlider = ({ value, AudioRef, setCurrentTime }) => {
    const handleonSlider = (e) => {
        AudioRef.currentTime = e;
        setCurrentTime(e);
    };

    return (
        <div className={styles.SliderWrapper}>
            <p className="text-[color:var(--text-subdued)] text-[length:var(--encore-text-size-smaller-2)]">0:{value !== NaN ? Math.floor(value) : 0}</p>
            <div className={styles.sliderContainer}>
                <ReactSlider
                    className={"horizontal-slider"}
                    thumbClassName={"example-thumb"}
                    trackClassName={"example-track"}
                    max={AudioRef?.duration}
                    min={0}
                    value={value !== NaN ? value : 0}
                    onSliderClick={handleonSlider}
                // renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
                />
            </div>
            <p className="text-[color:var(--text-subdued)] text-[length:var(--encore-text-size-smaller-2)]">0:{AudioRef?.duration !== NaN ? Math.floor(AudioRef?.duration) : 0}</p>
        </div>
    );
};

export default VideoSlider;
