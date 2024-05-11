import '../App.css'
import { Box, Button } from '@mui/material'
import MyTextField from './form/MyTextField'
import MyPassField from './form/MyPassField'
import MyButton from './form/MyButton'
import { Link, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import AxiosInstance from './AxiosInstante'
import { useNavigate } from 'react-router-dom'
import MyMessage from './Message'
import {React, useState} from 'react'

const PasswordReset = ()=>{
    const navigate = useNavigate()
    const {handleSubmit, control} = useForm()
    const {token} = useParams()
    console.log(token)
    const [showMessage, setShowMessage] = useState(false)

    const submission = (data)=>{
        AxiosInstance.post(`api/password_reset/confirm/`,{
            password:data.password,
            token: token,
        })
        .then((response) =>{
            setShowMessage(true)
            setTimeout(()=>{
                navigate("/")
            }, 6000)
        })
    }
    return(
        <div className={"myBackground"}>
            {showMessage ? <MyMessage text={"Your password reset was successfull, you will be directed to the login page in a second"} color={'#69C9AB'}/> : null}
            <form onSubmit={handleSubmit(submission)}>
                <Box className={"whiteBox"}>
                        <Box className={"itemBox"}>
                            <Box className={"title"}>
                                Reset password
                            </Box>
                        </Box>
                        <Box className={"itemBox"}>
                        <MyPassField label = {"Password"} name = {"password"} control={control}/>
                        </Box>
                        <Box className={"itemBox"}>
                        <MyPassField label = {"Confirm password"} name = {"password2"} control={control}/>
                        </Box>
                        <Box className={"itemBox"}>
                            <MyButton label={"Reset password"} type = {"submit"}/>
                        </Box>
                        <Box className={"itemBox"} sx={{flexDirection:'column'}}>
                            
                        </Box>  
                </Box>
            </form>
        </div>
    )
}

export default PasswordReset