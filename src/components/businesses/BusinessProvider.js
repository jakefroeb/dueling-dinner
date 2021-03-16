import { createContext, useState } from "react";
import { yelpKey } from "../Settings";

export const BusinessContext = createContext()

export const BusinessProvider = (props) => {
    const [businesses, setBusinesses] = useState([])

    const getBusinesses = (lat, lon) => {
        return fetch(`https://powerful-plateau-15272.herokuapp.com/https://api.yelp.com/v3/businesses/search?latitude=${lat}&longitude=${lon}`,{
          headers : {
            "Authorization" : yelpKey
          }})
          .then(res => res.json())
          .then(setBusinesses)
      }
    
    return(
        <BusinessContext.Provider value={{businesses, getBusinesses}}>
            {props.children}
        </BusinessContext.Provider>
    )
    
}