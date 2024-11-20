import { createContext , useContext , useState, useEffect} from "react"
import useAuth from "@/app/api/useAuth";


const GlobalContext = createContext();


export const useGlobalContext =() => useContext(GlobalContext)


const GlobalProvider = ({children}) =>{

const [user, setuser] = useState(null)
const [isLoading, setisLoading] = useState(true)
const { isAuthenticated} = useAuth()
useEffect(()=>{
  
if(isAuthenticated)
// setuser("Manasa")
setisLoading(false)
else setisLoading(true)
},[isAuthenticated])
    return (<GlobalContext.Provider value = {{isAuthenticated,setuser, setisLoading,user,isLoading

    }}>
        {children}
    </GlobalContext.Provider>)

}



export default GlobalProvider;