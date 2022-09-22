import { useState,useEffect } from "react";
import axios from 'axios'
export default function useAuth(code:string |string[]){
    const [accessToken,setAccessToken]= useState()
    const [refreshToken, setRefreshToken] = useState();
    const [expiresIn, setExpiresIn] = useState();
    

    useEffect(()=>{
        console.log(code)
        axios.post('/api/login',{
            code,
        }).then(res=>{
            setAccessToken(res.data.accessToken)
            setRefreshToken(res.data.refreshToken);
            setExpiresIn(res.data.setExpiresIn);
            window.history.pushState({},null,"/")
        }).catch(()=>{
            window.location.href="/"
        })
    },[code])

    useEffect(()=>{

    },[refreshToken,expiresIn])
    return accessToken
}