import axios from "./axios"
import { CookieValueTypes } from "cookies-next/lib/types"
import { API_URL } from "../config/config"

const isAuth = async (token: CookieValueTypes): Promise<any> => {  
    try {
        const res = await axios.post('auth/me')
        if(res.status !== 200) return {
              isAuth: false,
              user: null
        }
        
        return {
          isAuth: true,
          user: res.data.data.user
        }
    } catch (error) {
        return {
            isAuth: false,
            user: null
        }
    }

}

export {
    isAuth
}