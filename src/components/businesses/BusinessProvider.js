import { createContext, useState } from "react";
import { yelpKey } from "../Settings";

export const BusinessContext = createContext()

export const BusinessProvider = (props) => {
    const [businesses, setBusinesses] = useState([])
    const [showBusiness, setShowBusiness] = useState(false)
    const [matchingBusinesses, setMatchingBusinesses] = useState([])

    const getBusinesses = (lat, lon) => {
        return fetch(`https://powerful-plateau-15272.herokuapp.com/https://api.yelp.com/v3/businesses/search?latitude=${lat}&longitude=${lon}`,{
          headers : {
            "Authorization" : yelpKey
          }})
          .then(res => res.json())
          .then(res => {
              setBusinesses(res.businesses)
              setShowBusiness(true)
          })
      }
    const getBusinessById = (id) => {
        return fetch(`https://powerful-plateau-15272.herokuapp.com/https://api.yelp.com/v3/businesses/${id}`,{
            headers : {
                "Authorization" : yelpKey
        }})
        .then(res => res.json())
    }
    
    return(
        <BusinessContext.Provider value={{businesses, getBusinesses, showBusiness, setShowBusiness, getBusinessById, matchingBusinesses, setMatchingBusinesses, setBusinesses}}>
            {props.children}
        </BusinessContext.Provider>
    )
    
}