import { useContext, useEffect, useState } from "react"
import { Business } from "./Business"
import { BusinessContext } from "./BusinessProvider"

export const BusinessList = () =>{
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
            {console.log(showBusiness, businesses)}
            <div className="timer">Timer</div>
            <div className="businessCard">
                
                {showBusiness ? <Business businesses={businesses}/>:<></>}
                
            </div>
        </>
    )
}