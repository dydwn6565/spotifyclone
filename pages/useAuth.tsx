import { useState,useEffect } from "react";
import axios from 'axios'
export default function useAuth(code:string |string[]){
    const [accessToken,setAccessToken]= useState()
    const [refreshToken, setRefreshToken] = useState();
    const [expiresIn, setExpiresIn] = useState();
    

    useEffect(()=>{
        
        axios.post('/api/login',{
            code,
        }).then(res=>{
            setAccessToken(res.data.accessToken)
            setRefreshToken(res.data.refreshToken);
            setExpiresIn(res.data.expiresIn);
            // window.history.pushState({},null,"/")
        }).catch(()=>{
            // window.location.href="/"
        })
    },[code])

    useEffect(()=>{
        axios.post('/api/refresh',{
                refreshToken
        }).then(data=>{
            
            // setAccessToken(data.data.accessToken)
            // setExpiresIn(data.data.expiresIn);
        }).catch(()=>{
            // window.location.href="/"
        })

    },[refreshToken,expiresIn])
    return accessToken
}