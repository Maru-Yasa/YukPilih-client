import { getCookie } from "cookies-next"
import myAxios from "./axios"

const getAllPolls = async () => {
    try {
        const res = await myAxios.get('poll',{
            headers: {
                Authorization: `Bearer ${getCookie('authToken')}`
            }
        })
        return res.data.data
    } catch (error) {
        throw error
    }
}

const getPollById = async (id) => {
    try {
        const res = await myAxios.get(`poll/${id}`,{
            headers: {
                Authorization:  `Bearer ${getCookie('authToken')}`
            }
        })
        return res.data
    } catch (error) {
        return error.response.data
    }
}

const deletePollById = async (id) => {
    try {
        const res = await myAxios.delete(`poll/${id}`,{
            headers: {
                Authorization: `Bearer ${getCookie('authToken')}`
            }
        })
        res.data.data
        return true
    } catch (error) {
        return false
    }
}

const votePoll = async (pollId: number, choiceId: number) => {
    try {
        const res = await myAxios.post(`poll/${pollId}/vote/${choiceId}`,{},{
            headers: {
                Authorization: `Bearer ${getCookie('authToken')}`
            }
        })
        return res.data
    } catch (error) {
        return error.response.data
    }
}

export {
    getAllPolls,
    deletePollById,
    getPollById,
    votePoll
}