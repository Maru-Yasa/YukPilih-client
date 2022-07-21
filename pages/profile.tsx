import { Avatar, Button, Collapse, Group, Image, Paper, PasswordInput, Text, TextInput } from "@mantine/core";
import { useForm, useToggle } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { getCookie,removeCookies } from "cookies-next";
import { AppContext } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Edit, EditCircle, Logout } from "tabler-icons-react";
import { API_URL } from "../config/config"
import useUser from "../hooks/useUser";
import { changePassword, logout } from "../lib/auth";
import { CheckIcon } from '@modulz/radix-icons';
  

export default function Profile({}){
    const Router = useRouter()
    const { isAuth, user } = useUser({})
    const [isLoading, setIsLoading] = useToggle(false, [true,false])
    const form = useForm({
        initialValues: {
            old_password: '',
            new_password: ''
        },
        validationRules: {
        }
    })
    const [ changePasswordCollapse, changePasswordToggle ] = useToggle(false, [true, false])
    const logoutHandler = () => {
        logout().then((res) => {
            console.log(res);
            removeCookies('authToken')
            Router.push('/')
        })
    }

    const changePasswordHandler = (values: typeof form.values) => {
        setIsLoading()
        changePassword(values).then((res) => {            
            if(typeof res === 'object'){
                if(typeof res.msg === 'object'){
                    form.setErrors({
                      old_password: res.msg?.old_password && res.msg.old_password[0] || null,
                      new_password: res.msg?.new_password && res.msg.new_password[0] || null,
                    })
                  }else{
                    form.resetErrors()
                    form.setErrors({
                      old_password: res.msg,
                      new_password: res.msg
                    })
                }


            }
                            
            if(typeof res === 'boolean'){                
                showNotification({
                    title: "Success",
                    message: "Success reset password",
                    icon: <CheckIcon />,
                    color: 'teal',
                    autoClose: 3000,
                    onClose: () => {
                        form.reset()
                        logoutHandler()
                    }
                })
            }
            setIsLoading()
        })
    }

    useEffect(() => {
        
    })
    return <>
            <Group position="center">
                <Avatar color={'gray'} radius={120} size={128}>
                    <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Faenza-avatar-default-symbolic.svg/480px-Faenza-avatar-default-symbolic.svg.png"></Image>
                </Avatar>
            </Group>
            <Text align="center" className="fw-bold fs-3" color={'blue'} mt={10}>{user.username}</Text>
        <div className="row mt-3 justify-content-center">
            <Paper radius={20} className="col-lg-3 col-md-5 col-11" shadow={'sm'} m={'lg'} p={'md'}>
                <Group position="center">
                    <Button size="xs" onClick={() => { changePasswordToggle() }} variant="outline" leftIcon={
                        <Edit size={16} />
                    }>
                        Change Password
                    </Button>
                    <Button onClick={() => { logoutHandler() }} size="xs" variant="outline" color={'red'} leftIcon={
                        <Logout size={16} />
                    }>
                        Logout
                    </Button>
                </Group>
            </Paper>
        </div>

        <Collapse in={changePasswordCollapse}>
            <Group position="center">
                <div className="row mt-3 col-lg-4 col-10 justify-content-center">
                    <Paper shadow={'sm'} className="col-12 p-3">
                        <Text className="fw-bold fs-5 mb-3">Change password</Text>
                        <form action="" onSubmit={form.onSubmit(changePasswordHandler)}>
                        <PasswordInput 
                            onChange={(event) => form.setFieldValue('old_password', event.currentTarget.value)} 
                            value={form.values.old_password}
                            required 
                            mx={'md'} 
                            mb={'md'} 
                            error={form.errors.old_password}
                            label="Old Password" 
                            placeholder="Your old password"
                        ></PasswordInput>
                        <PasswordInput 
                            onChange={(event) => form.setFieldValue('new_password', event.currentTarget.value)} 
                            value={form.values.new_password}
                            required 
                            mx={'md'} 
                            mb={'md'} 
                            error={form.errors.new_password}
                            label="New Password" 
                            placeholder="Your new password"
                        ></PasswordInput>

                        {isLoading ? (<>
                        
                        </>) : (<>
                        </>)}

                        <Button type="submit" mx={'md'} size={'xs'} mb={'md'} variant="outline">Change Password</Button>

                        </form>

                    </Paper>
                </div>
            </Group>
        </Collapse>
    
    </>
}
