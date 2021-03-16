import { useContext, useEffect, useState } from "react"
import { UserContext } from "./UserProvider"

export const UserSelect = () => {
    const {users, getUsers} = useContext(UserContext)
    const [buttonDisabled, setButtonDisabled] = useState(true)

    useEffect(()=>{
        getUsers()
    },[])
    const success = (pos) => {
        console.log("lat", pos.coords.latitude)
        console.log("lon", pos.coords.longitude)
      }
    const error = () => {
        alert("couldnt get coords, please allow this site to access your location")
    }
    const startDuel = (e) => {
        e.preventDefault()
         
        window.navigator.geolocation.getCurrentPosition(success, error)
        console.log("Start Duel")
        
    }
    const handleSelectChange = (event) => {
        if(event.target.value === "0" || event.target.value === sessionStorage.getItem("app_user_id")){
            setButtonDisabled(true)
        }else{
            setButtonDisabled(false)
        }
    }

    return(
        <>
            <select className="userDropDown" id="userSelect" onChange={handleSelectChange}>
                <option key="0" value="0">Choose another User...</option>
                {users?.map(user => <option key={user.id} value={user.id}>{user.name}</option>)}
            </select>
            <button onClick={startDuel} disabled={buttonDisabled}>Start Duel</button>
        </>
    )
}