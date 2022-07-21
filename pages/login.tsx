import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from '@mantine/core';
import { useForm, useToggle } from '@mantine/hooks';
import axios from 'axios';
import { setCookies, getCookie } from 'cookies-next';
import { AppContext } from 'next/app';
import { useRouter } from 'next/router';
import { API_URL, BASE_URL } from '../config/config';

export default function Login() {
  const Router = useRouter()
  const [isLoading, toggleLoading] = useToggle(false, [true,false])
  const form = useForm({
    initialValues: {
        username: '',
        password: ''
    },
    validationRules: {

    }
  })
  const handleSubmit = (values: typeof form.values) => {
    toggleLoading(true)
    axios.get(BASE_URL + '/sanctum/csrf-cookie' ).then((res) => {
        // axios.defaults.withCredentials = true
        axios.post(API_URL + '/auth/login', {
          username: values.username,
          password: values.password
        }).then((res) => {
          res = res.data
          form.reset()
          toggleLoading(false)
          setCookies('authToken', res.data.token)
          Router.push('/polls')
          
        }).catch((res) => {
          console.log(res);
          
          console.log(res.response.data)
          res = res.response.data
          
          if(typeof res.msg === 'object'){
            form.setErrors({
              username: res.msg?.username && res.msg.username[0] || null,
              password: res.msg?.password && res.msg.password[0] || null,
            })
          }else{
            form.resetErrors()
            form.setErrors({
              username: res.msg,
              password: res.msg
            })
            toggleLoading(false)
          }
    
        })
    })

  }

  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
      >
        Welcome back!
      </Title>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit(handleSubmit)} action="">
        <TextInput 
            label="Username" 
            placeholder="Your username" 
            required 
            value={form.values.username}
            onChange={(event) => {
                form.setFieldValue('username', event.currentTarget.value)
            }}  
            error={form.errors.username}
        />
        <PasswordInput 
            label="Password" 
            placeholder="Your password" 
            required 
            mt="md" 
            value={form.values.password}
            onChange={(event) => {
                form.setFieldValue('password', event.currentTarget.value)
            }}  
            error={form.errors.password}
        />
        <Group position="apart" mt="md">
          <Checkbox label="Remember me" />
        </Group>

        {isLoading === true ? (
          <Button type='submit' fullWidth mt="xl" loading loaderPosition='left'>
          Sign in
        </Button>
        ) : (
          <Button type='submit' fullWidth mt="xl">
          Sign in
        </Button>
        )}

        </form>

      </Paper>
    </Container>
  );
}

Login.getInitialProps = (ctx: AppContext) => {


}