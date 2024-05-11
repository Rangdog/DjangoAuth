import '../App.css'
import { Box, Button } from '@mui/material'
import MyTextField from './form/MyTextField'
import MyPassField from './form/MyPassField'
import MyButton from './form/MyButton'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import AxiosInstance from './AxiosInstante'
import { useNavigate } from 'react-router-dom'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'

const Register = ()=>{
    const navigate = useNavigate()

    const schema = yup
    .object({
        email:yup.string().email('Field expects an email adress').required('Email is a required field'),
        password: yup.string().required('Password is a required field').min(8,'Password must be at least 8 characters').matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[a-z]/, 'Password must contain at least one lower case letter')
        .matches(/[0-9]/, 'Password must contain at least one number letter')
        .matches(/[!@#$%^&*()<>?:"{}[]|\+-_=]/, 'Password must contain at least one special character letter'),
        password2: yup.string().required('Password confirmation is a required field')
        .oneOf([yup.ref('password'), null], 'Password must match')
    })

    const {handleSubmit, control} = useForm({resolver: yupResolver(schema)})

    const submission = (data)=>{
        AxiosInstance.post(`register/`,{
            email:data.email,
            password: data.password,
        })
        .then(() =>{
            navigate(`/`)
        })
    }
    return(
        <div className={"myBackground"}>
            <form onSubmit={handleSubmit(submission)}>
                <Box className={"whiteBox"}>
                    <Box className={"itemBox"}>
                        <Box className={"title"}>
                            User registration
                        </Box>
                    </Box>
                    <Box className={"itemBox"}>
                        <MyTextField label = {"Email"} name = {"email"} control={control}/>
                    </Box>
                    <Box className={"itemBox"}>
                        <MyPassField label = {"Password"} name = {"password"} control={control}/>
                    </Box>
                    <Box className={"itemBox"}>
                        <MyPassField label = {"Comfirm password"} name = {"password2"} control={control}/>
                    </Box>
                    <Box className={"itemBox"}>
                        <MyButton label={"Register"} type = {"submit"}/>
                    </Box>
                    <Box className={"itemBox"}>
                        <Link to = "/" >Already registred? Please login!</Link>
                    </Box>  
                </Box>
            </form>
        </div>
    )
}

export default Register