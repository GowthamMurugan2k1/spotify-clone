'use client'
const { createContext, useState } = require("react");

const SongPlayContext = createContext({
    setSongDetails: () => { },
    SongDetails: {
        image: '',
        title: '',
        audio: null,
        artist: [],
        id: null
    },
    setisPlaying: () => { },
    isPlaying: false
})

export const SongPlayContextProvider = (props) => {
    const [SongDetails, setSongDetails] = useState({
        image: '',
        title: '',
        audio: null,
        artist: [],
        id: null
    })
    const [isPlaying, setisPlaying] = useState(true);

    const context = { SongDetails, setSongDetails, isPlaying, setisPlaying }

    return (
        <SongPlayContext.Provider value={context}>
            {props.children}
        </SongPlayContext.Provider>
    )

}

export default SongPlayContext;