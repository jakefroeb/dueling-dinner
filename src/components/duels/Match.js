import { useContext, useEffect, useState } from "react"
import { BusinessContext } from "../businesses/BusinessProvider"

export const Match = ({match}) => {
    const {getBusinessById} = useContext(BusinessContext)
    const [business, setBusiness] = useState()
    useEffect(()=>{

        getBusinessById(match.restaurantId).then(setBusiness)
    },[])
    return(
        <>
        <h4>{business?.name}</h4>
        </>
    )
}