import { useContext, useState } from "react"

const SocketContext = React.createContext()

export const useScocketContext = ()=>{
    return useContext(SocketContext)
}

export const SocketProvider = ({children}) =>{
    const [socket, setSocket] = useState(null)
    const   [onlineUsers,setOnlineUsers]= useState([])
    return (
        <SocketContext.Provider value={{socket,setSocket,onlineUsers, setOnlineUsers}}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketContext 