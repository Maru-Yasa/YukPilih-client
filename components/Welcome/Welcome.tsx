import { Title, Text, Anchor, Group, Button } from '@mantine/core';
import useStyles from './Welcome.styles';
import { DoorEnter, Login } from 'tabler-icons-react'
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { isAuth } from '../../lib/checkAuth';
import { getCookie } from 'cookies-next';
import useUser from '../../hooks/useUser';

export function Welcome() {
  const Router = useRouter()
  const { classes } = useStyles();
  const { isAuth } = useUser({redirect:false})

  useEffect(() => {

  }, [])

  return (
    <>
      <Title className={classes.title} align="center" mt={100}>
        Welcome to{' '}
        <Text inherit variant="gradient" component="span">
          YukPilih
        </Text>
      </Title>
      <Text color="dimmed" align="center" size="lg" sx={{ maxWidth: 580 }} mx="auto" mt="">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga reiciendis ex aliquid corporis placeat sed similique vitae eaque deserunt numquam.
      </Text>
      <Group position='center' mt='md'>

        {isAuth ? (
          <>
          
          <Button 
          onClick={() => {
            Router.push('/polls')
          }}
          size='lg' 
          leftIcon={
            <DoorEnter />
          }
          >
          Start Voting
      </Button>         
          </>
        ) : (
          <>
          
          <Button 
          onClick={() => {
            Router.push('/login')
          }}
          size='lg' 
          leftIcon={
            <Login />
          }
          >
          Login
      </Button>
          
          </>
        )}
        




      </Group>
    </>
  );
}
