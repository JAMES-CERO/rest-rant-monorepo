import { createContext, useEffect, useState } from "react";


export const CurrentUser = createContext()

function CurrentUserProvider({ children }){

    const [currentUser, setCurrentUser] = useState(null)

    useEffect(() => {
        const getLoggedInUser = async () => {
            try {
                const response = await fetch("http://localhost:4000/authentication/profile", {
                  credentials: "include",
                });
                const text = await response.text();
                console.log(text); // log the response text
                const user = JSON.parse(text);
                setCurrentUser(user);
              } catch (error) {
                console.error(error);
              }
            };
        getLoggedInUser()
    }, [])

    return (
        <CurrentUser.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </CurrentUser.Provider>
    )
}

export default CurrentUserProvider