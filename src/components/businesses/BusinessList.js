import { useContext, useEffect, useState } from "react"
import { BusinessContext } from "./BusinessProvider"

export const BusinessList = () =>{
    const {businesses, getBusinesses} = useContext(BusinessContext)
    
    const success = (pos) => {
        console.log("lat", pos.coords.latitude)
        console.log("lon", pos.coords.longitude)
        getBusinesses(pos.coords.latitude,pos.coords.longitude)
    }
    const error = () => {
        alert("couldnt get coords, please allow this site to access your location")
    }
    useEffect(()=>{
        window.navigator.geolocation.getCurrentPosition(success, error)
    },[])

    return(
        <>
            <div className="timer">Timer</div>
            <div className="businessCard">Business Card</div>
        </>
    )
}