import { useContext, useEffect, useState } from "react"
import { userStorageKey } from "../auth/authSettings"
import { BusinessContext } from "../businesses/BusinessProvider"
import { DuelContext } from "./DuelProvider"

export const Match = ({match, userId, duelId, setShowMatch}) => {
    const {getBusinessById} = useContext(BusinessContext)
    const {finishDuel} = useContext(DuelContext)
    const [business, setBusiness] = useState()
    useEffect(()=>{
        getBusinessById(match.restaurantId).then(setBusiness)
    },[])
    const finalizeDuel = (e) => {
        finishDuel(business.id, business.name, duelId)
        .then(setShowMatch(false))
    }
    return(
        <>
        <h4>{business?.name}</h4>
        {userId === parseInt(sessionStorage.getItem(userStorageKey)) ? <button key={business?.id} onClick={finalizeDuel}>Select</button> : <></>}
        </>
    )
}