import { useRouter } from "next/router"
import { useCallback, useEffect, useState } from "react"
import Dashboard from "../../components/Welcome/admin/Dashboard"
import PollPage from "../../components/Welcome/admin/PollPage"
import useUser from "../../hooks/useUser"

const pages = {
    dashboard: <Dashboard />,
    poll: <PollPage />
}

export default function(){
    const Router = useRouter()
    const {isAdmin, isAuth, user} = useUser({})

    const [page, setPage] = useState(Router.query.page || 'dashboard')
    const handleChangePage = useCallback((page: string) => {
        setPage(page)
    }, [page])

    useEffect(() => {
        const page = Router.query.page
        setPage(Router.query.page || '')
        console.log(Router.query);
        
    }, [])

    return (<>
    
        {isAdmin ? (<>
        
            { pages[page] }

        </>):(<>
        
        </>)}
    
    </>)

}