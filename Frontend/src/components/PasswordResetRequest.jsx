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

const PasswordResetRequest = ()=>{
    const navigate = useNavigate()
    const {handleSubmit, control} = useForm()

    const [showMessage, setShowMessage] = useState(false)

    const submission = (data)=>{
        AxiosInstance.post(`api/password_reset/`,{
            email:data.email,
        })
        .then((response) =>{
            setShowMessage(true)
        })
    }
    return(
        <div className={"myBackground"}>
            {showMessage ? <MyMessage text={"If your email exists you have received an email with instructions for resetting your password"} color={'#69C9AB'}/> : null}
            <form onSubmit={handleSubmit(submission)}>
                <Box className={"whiteBox"}>
                        <Box className={"itemBox"}>
                            <Box className={"title"}>
                                Request password reset
                            </Box>
                        </Box>
                        <Box className={"itemBox"}>
                            <MyTextField label = {"Email"} name = {"email"} control={control}/>
                        </Box>
                        <Box className={"itemBox"}>
                            <MyButton label={"Request password reset"} type = {"submit"}/>
                        </Box>
                        <Box className={"itemBox"} sx={{flexDirection:'column'}}>
                            
                        </Box>  
                </Box>
            </form>
        </div>
    )
}

export default PasswordResetRequest