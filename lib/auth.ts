import { getCookie } from "cookies-next"
import myAxios from "./axios"

const logout = async () => {
    const res = await myAxios.post('auth/logout',{},{
        headers:{
            Authorization: `Bearer ${getCookie('authToken')}`
        }
    })
    sessionStorage.clear()
    return res.data
}

interface changePasswordParams {
    old_password: string,
    new_password: string
}

const changePassword = async (values: changePasswordParams) => {
    try {
        const res = await myAxios.post('auth/resetpassword',values)
        if(res.status === 200) return true
        if(res.status === 422) return res.data
    } catch (error) {
        console.log(`[changePassword function] error while change password ${error}`);
        return error.response.data
    }
}

export {
    logout,
    changePassword
}