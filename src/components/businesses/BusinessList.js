import { useContext, useEffect, useState } from "react"
import { DuelContext } from "../duels/DuelProvider"
import { Timer } from "../duels/Timer"
import { Business } from "./Business"
import { BusinessContext } from "./BusinessProvider"

export const BusinessList = ({setDuelStarted}) =>{
    const { duelId} = useContext(DuelContext)
    const {businesses, getBusinesses, showBusiness} = useContext(BusinessContext)
    const success = (pos) => {
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
            <div className="timer">
                {showBusiness ? <Timer setDuelStarted={setDuelStarted}/> : <></>}
            </div>
            <div className="businessCard"> 
                {showBusiness ? <Business businesses={businesses} duelId={duelId}/>:<></>}
            </div>
        </>
    )
}