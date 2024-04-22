import { useState } from "react"

const SocketContext = React.createContext()

export const SocketProvider = ({children}) =>{
    const [socket, setSocket] = useState(null)
    const   onlineUsers = []
    return (
        <SocketContext.Provider value={{socket,setSocket,onlineUsers}}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketContext 