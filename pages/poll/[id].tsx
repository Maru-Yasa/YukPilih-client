import { createStyles, Divider, Group, Loader, Paper, RingProgress, Text, ThemeIcon, Center, SimpleGrid, Collapse, Button, UnstyledButton } from "@mantine/core"
import { useToggle } from "@mantine/hooks"
import { showNotification } from "@mantine/notifications"
import { CheckIcon } from "@modulz/radix-icons"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Check, X } from "tabler-icons-react"
import useUser from "../../hooks/useUser"
import { getPollById, votePoll } from "../../lib/poll"
import { isExpiredPoll } from "../../lib/utils"

const ICON_SIZE = 60

const useStyles = createStyles((theme) => ({
    card: {
      position: 'relative',
      overflow: 'visible',
      padding: theme.spacing.xl,
      paddingTop: theme.spacing.xl * 1.5 + ICON_SIZE / 3,
    },
  
    normalCard: {
      position: 'relative',
      overflow: 'visible',
      padding: theme.spacing.xl,
    },


    icon: {
      position: 'absolute',
      top: -ICON_SIZE / 3,
      left: `calc(50% - ${ICON_SIZE / 2}px)`,
    },
  
    title: {
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
      lineHeight: 1,
    },
  }));

export default function(){
    const Router = useRouter()
    const { isAdmin } = useUser({})
    const { classes } = useStyles()
    const { id } = Router.query
    const [poll, setPoll] = useState({})
    const [isLoading, setIsLoading] = useToggle(true, [true,false])
    const [isExpired, setIsExpired] = useState(true)
    const [resultTab, setResultTab] = useToggle(false, [true, false])

    const getPoll = (id) => {
        getPollById(id).then((res) => {
            if(res.status !== 'success') setPoll(false)
            setPoll(res.data)
            setIsExpired(isExpiredPoll(res.data.deadline))
            setIsLoading(false)
        })
    }

    const voteHandler = (pollId: number, choiceId: number) => {
      votePoll(pollId, choiceId).then((res) => {
        if(res.status !== 'success'){          
          showNotification({
            title:"Error",
            message: res.msg,
            autoClose: 3000,
            color: 'red',
            icon: <X />,
          })
        }else{
          showNotification({
            title:"Success",
            message: res.msg,
            autoClose: 3000,
            color: 'teal',
            icon: <CheckIcon />,
          })
          getPoll(id)
        }
      })
    }

    const results = Object.keys(poll.result || {}).map((key) => {
        const result = poll.result[key]
        return (
          <Paper className="mx-2 col-10 col-lg-3 col-md-4 my-2" withBorder radius="md" p="xs" key={key}>
            <Group>
              <RingProgress
                size={80}
                roundCaps
                thickness={8}
                sections={[{ value: result, color: 'teal' }]}
                label={
                  <Center>
                    <Check />
                  </Center>
                }
              />
    
              <div>
                <Text color="dimmed" size="xs" transform="uppercase" weight={700}>
                  {key}
                </Text>
                <Text weight={700} size="xl">
                  {result}%
                </Text>
              </div>
            </Group>
          </Paper>
        );
      });

    const choices = poll.choices?.map((choice) => {
      return (<>
        <Button onClick={() => voteHandler(choice.poll_id, choice.id)} variant="outline" color={'teal'} disabled={isExpired} key={choice.id} className="mt-3 px-0 mx-2 col-3 choice">
          {choice.choice}
        </Button>
      </>)
    })

    useEffect(() => {
        getPoll(id)
    }, [])

    useEffect(() => {
        console.log(poll);
        
    }, [poll])

    return <>
        {isLoading ? (<>
        
            <Group position="center">
                <Loader size={'lg'} />
            </Group>

        </>):(<>
            
            <div className="row justify-content-center">

                <div className="col-lg-7 col-10">
                    <Paper withBorder mt={100} radius={'md'} className={classes.card}>
                      {isExpired ? (<>
                        <ThemeIcon size={ICON_SIZE} color={'red'} radius={ICON_SIZE} className={classes.icon}>
                            <X size={34} />
                        </ThemeIcon>
                      </>):(<>
                        <ThemeIcon size={ICON_SIZE}  radius={ICON_SIZE} className={classes.icon}>
                            <Check size={34} />
                        </ThemeIcon>                      
                      </>)}

                        <Text className={classes.title} align="center">
                            {poll.title}
                        </Text>
                        <Text mt={5} align="center" color={'dimmed'} size={'sm'}>
                            {poll.description}
                        </Text>
                        {isAdmin || isExpired ? (<>
                          <Group mt={'xs'} position="center">
                            <Button variant="outline" onClick={() => {setResultTab()}} color={'teal'} size={'xs'}>Show result</Button>
                          </Group>
                        </>):(<></>)}

                    </Paper>
                </div>

                          
              {isAdmin || isExpired ? (<>
                <div className="col-10">
              <Collapse in={resultTab}>
                    <div className="mt-2 row justify-content-center">
                        {results}
                    </div>
              </Collapse>
              </div>    
              </>):(<></>)}
              
              <div className="col-12 row justify-content-center">
                <Divider className="col-lg-5 col-10 my-2 mt-3" label={<> Choices </>} labelPosition="center" />
              </div>
              
              <div className="col-12 row justify-content-center">
                {choices}
              </div>


            </div>
        </>)}

    </>
}