'use client'
import { createContext, useEffect, useState } from "react";
import { getCookie } from "cookies-next";


// UserContext
const UserContext = createContext({
    isAccessToken: null,
    setAccessToken: () => { }
})

export function UserContextProvider(props) {
    const [isAccessToken, setAccessToken] = useState(false)

    useEffect(() => {
        let token = getCookie('accesstoken');
        setAccessToken(token ? true : false)
    }, [])

    const context = { isAccessToken, setAccessToken }

    return (
        <UserContext.Provider value={context}>
            {props.children}
        </UserContext.Provider>
    );
}
export default UserContext;