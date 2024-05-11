import '../App.css'
import { Box, Button } from '@mui/material'
import MyTextField from './form/MyTextField'
import MyPassField from './form/MyPassField'
import MyButton from './form/MyButton'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import AxiosInstance from './AxiosInstante'
import { useNavigate } from 'react-router-dom'
import MyMessage from './Message'
import {React, useState} from 'react'

const Login = ()=>{
    const navigate = useNavigate()
    const [showMessage, setShowMessage] = useState(false)
    const {handleSubmit, control} = useForm()
    const submission = (data)=>{
        AxiosInstance.post(`login/`,{
            email:data.email,
            password: data.password,
        })
        .then((response) =>{
            console.log(response)
            localStorage.setItem('Token', response.data.token)
            navigate(`/home`)
        })
        .catch((error) =>{
            setShowMessage(true)
            control.error('error during login',  error)
        })
    }
    return(
        <div className={"myBackground"}>
            {showMessage ? <MyMessage text={"Login has failed, please try again, or reset yout password"} color={"#EC5A76"}/> : null}
            <form onSubmit={handleSubmit(submission)}>
                <Box className={"whiteBox"}>
                        <Box className={"itemBox"}>
                            <Box className={"title"}>
                                Login for Auth App
                            </Box>
                        </Box>
                        <Box className={"itemBox"}>
                            <MyTextField label = {"Email"} name = {"email"} control={control}/>
                        </Box>
                        <Box className={"itemBox"}>
                            <MyPassField label = {"Password"} name = {"password"} control={control}/>
                        </Box>
                        <Box className={"itemBox"}>
                            <MyButton label={"Login"} type = {"submit"}/>
                        </Box>
                        <Box className={"itemBox"} sx={{flexDirection:'column'}}>
                            <Link to = "/register" >No account yet please Register</Link>
                            <Link to = "/request/password_reset" > Password Forgotten? Click here </Link>
                        </Box>  
                </Box>
            </form>
        </div>
    )
}

export default Login