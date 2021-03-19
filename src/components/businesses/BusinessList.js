import { useContext, useEffect, useState } from "react"
import { DuelContext } from "../duels/DuelProvider"
import { Timer } from "../duels/Timer"
import { Business } from "./Business"
import { BusinessContext } from "./BusinessProvider"

export const BusinessList = ({setDuelStarted}) =>{
    const {businesses, getBusinesses, showBusiness, getBusinessById, setMatchingBusinesses, matchingBusinesses, setBusinesses} = useContext(BusinessContext)
    const {receiver, duelId, getMatches} = useContext(DuelContext)
    let promises
    const success = (pos) => {
        getBusinesses(pos.coords.latitude,pos.coords.longitude)
    }
    const error = () => {
        alert("couldnt get coords, please allow this site to access your location")
    }
    useEffect(()=>{
        if(receiver){
            console.log(duelId)
            getMatches(duelId)
            .then(matches => {
                return matches.map(match => getBusinessById(match.restaurantId))
            })
            .then(promises =>  {
                Promise.all(promises).then(matchingBusiness=>{
                    setMatchingBusinesses(matchingBusiness)
                })
            })
            .then(window.navigator.geolocation.getCurrentPosition(success, error))
        }
    },[])


    return(
        <>
            <div className="timer">
                {showBusiness ? <Timer setDuelStarted={setDuelStarted}/> : <></>}
            </div>
            <div className="businessCard"> 
                {showBusiness ? <Business/>:<></>}
            </div>
        </>
    )
}