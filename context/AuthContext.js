import React, { Children, useContext, useState } from "react";

const AuthContext = React.createContext()

export function useSession (){
    return useContext(AuthContext)
}

export const AuthProvider = ({children})=>{
    const [user, setUser] = useState(null)
    return (
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext