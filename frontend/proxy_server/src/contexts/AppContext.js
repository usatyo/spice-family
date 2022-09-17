import { createContext, useState } from "react";

export const AppContext = createContext()

const AppContextProvider = ({children}) => {
  const [userName, setUserName] = useState("")
  const [gameId, setGameId] = useState(undefined)
  return(
    <AppContext.Provider
      value={{
        userName,
        setUserName,
        gameId, 
        setGameId,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppContextProvider