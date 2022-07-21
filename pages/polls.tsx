import { ActionIcon, Button, Center, Grid, Group, Loader, Paper, Text, TextInput } from "@mantine/core"
import { useToggle } from "@mantine/hooks"
import { showNotification } from "@mantine/notifications"
import { CheckIcon } from "@modulz/radix-icons"
import { useRouter } from "next/router"
import { useCallback, useEffect, useState } from "react"
import { Route, Search, Trash } from "tabler-icons-react"
import PollCard from "../components/PollCard"
import useUser from "../hooks/useUser"
import { deletePollById, getAllPolls } from "../lib/poll"
import { sortingByExpired } from "../lib/utils"

export default function Polls(){
    const Router = useRouter()
    const { user, isAuth, isAdmin } = useUser({})
    const [isLoading, toggleLoading] = useToggle(true,[true,false])
    const [polls, setPolls] = useState([])
    const [filteredPolls, setFilteredPolls] = useState(polls)
    const [search, setSearch] = useState('')

    const handleAfterDelete = useCallback(() => {
        getAllPolls().then((data) => {
            setPolls(data)
            showNotification({
                title: "Success",
                message: "Success deleting poll",
                color: "teal",
                icon: <CheckIcon />,
                autoClose: 3000
            })
        })
    }, [polls])

    useEffect(() => {
        getAllPolls().then((data) => {
            setPolls(data)
        })
    }, [])

    useEffect(() => {
        setFilteredPolls(polls)
    }, [polls])

    useEffect(() => {
        toggleLoading(false)
    }, [filteredPolls])

    useEffect(() => {

        const result = polls.filter((poll) => {
            return poll.title.toLowerCase().search(search) != -1
        })
        setFilteredPolls(result)

    }, [search])

    return <>
    
        {isLoading ? (
            <Center>
                <Loader size={'lg'}/>
            </Center>
        ) : (
            <>
                <Group position="center" mb={'lg'}>
                    <TextInput placeholder="Search poll" size="lg" onChange={(event) => setSearch(event.currentTarget.value)} rightSection={<Search size={16} />}></TextInput>
                </Group>
                <Group className="container" position="center" px={"lg"}>
                    <div className="row mt-3 col-12 justify-content-center">
                        {filteredPolls.sort(sortingByExpired).map((poll,key) => {
                            return (
                                <PollCard handleAfterDelete={handleAfterDelete} pollId={poll.id} title={poll.title} description={poll.description} isAdmin={isAdmin} deadline={poll.deadline} />
                            )

                        })}                        
                    </div>
                </Group>

            
            </>
        )}
    
    </>
}
