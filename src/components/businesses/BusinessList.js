import { useContext, useEffect, useState } from "react"
import { DuelContext } from "../duels/DuelProvider"
import { Timer } from "../duels/Timer"
import { Business } from "./Business"
import { BusinessContext } from "./BusinessProvider"

export const BusinessList = ({setDuelStarted}) =>{
    const { getBusinesses, showBusiness, getBusinessById, setMatchingBusinesses, matchingBusinesses, setBusinesses} = useContext(BusinessContext)
    const {receiver, duelId, getMatches} = useContext(DuelContext)
    const success = (pos) => {
        getBusinesses(pos.coords.latitude,pos.coords.longitude)
    }
    const error = () => {
        alert("couldnt get coords, please allow this site to access your location")
    }


    useEffect(()=>{
        if(receiver){
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
        }else{
            window.navigator.geolocation.getCurrentPosition(success, error)
        }
    },[])
//Use effect if you are the receiver then the app will grab the matches from the initiator to present those options first
// then grabs the lat lon from your current location on success will get Businesses

    return(
        <>
        {/* showBusiness is a variable i use to not start the timer or display business until the data has been retrieved from fetch call as it takes a while */}
            <div className="timer">
                {showBusiness ? <Timer setDuelStarted={setDuelStarted}/> : <></>}
            </div>
            <div className="businessCard"> 
                {showBusiness ? <Business/>:<></>}
            </div>
        </>
    )
}