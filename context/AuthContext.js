import React, { Children, useContext } from "react";

const AuthContext = React.createContext()

export function useSession (){
    return useContext(AuthContext)
}

export const AuthProvider = ({children})=>{
    const [user, setUser] = userState(null)
    return (
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext