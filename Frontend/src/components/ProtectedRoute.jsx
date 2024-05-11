import { Outlet,Navigate } from "react-router-dom";

const ProtectedRouter = ()=>{
    const token = localStorage.getItem('Token')  

    return (
        token ? <Outlet/> : <Navigate to="/"/>
    )
}


export default ProtectedRouter