import { getCookie, checkCookies } from "cookies-next"
import { useRouter } from "next/router"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import axios from "../lib/axios"
import { isAuth as checkAuth } from '../lib/checkAuth' 

interface User{
    id: number,
    username: string,
    role: string,
    devision_id: number,
    created_at: string,
    update_at: string
}

interface UserState{
    user: User,
    setUser: Dispatch<SetStateAction<{}>>
}

interface useUserParams {
    redirect?: boolean,
    failUrl?: string
}

function useUser({redirect = true, failUrl = '/login'}: useUserParams) {
    const Router = useRouter()
    const [isAuth, setIsAuth] = useState(false)
    const [user, setUser] = useState({})
    const [isAdmin, setIsAdmin] = useState(false)

    const getUserFromAPI = async () => { 
        try {
            const res = await axios.post('auth/me',{} ,{
                headers: {
                    Authorization: `Bearer ${getCookie('authToken')}`
                }
            })
            console.log(`[useUser/useEffect] axios headers: ${JSON.stringify(res.request)}`);
            setIsAuth(true)
            setUser(res.data.data.user)
            if(res.data.data.user.role === 'admin') setIsAdmin(true)
            sessionStorage.setItem('user', JSON.stringify(res.data.data.user))
            console.log(`[getUserFromAPI] success fetching user `);
            
        } catch (error) {
            setIsAuth(false)
            if(redirect) Router.push(failUrl)
            console.log(`[getUserFromAPI] error fetching user ${error} `);

        }
    }

    const getUserFromSession = () => {
        const user = JSON.parse(sessionStorage.getItem('user') || '')
        setIsAuth(true)
        setUser(user)
        if(user.role === 'admin') setIsAdmin(true)
    }

    const handleNoToken = () => {
        if(redirect) Router.push(failUrl)
    }

    useEffect(() => {
        console.log(`[useUser/useEffect]  ${getCookie('authToken')}`);        
        if(checkCookies('authToken')){
            if(typeof sessionStorage.getItem('user') === 'string'){
                console.log("Get user from session storage");
                getUserFromSession()
            }else{
                console.log("Get user from API");
                getUserFromAPI()
            }            
        }else{
            handleNoToken()
        }

    }, [])

    return {
        isAuth,
        user,
        isAdmin
    }

}

export default useUser