import { useContext, useEffect, useState } from "react"
import { DuelContext } from "../duels/DuelProvider"
import { UserContext } from "./UserProvider"

export const UserSelect = ({setDuelStarted}) => {
    const {users, getUsers} = useContext(UserContext)
    const [buttonDisabled, setButtonDisabled] = useState(true)
    const {initializeDuel, setReceiver} = useContext(DuelContext)
    const [receiverId, setReceiverId] = useState(0)

    useEffect(()=>{
        getUsers()
    },[])
    
    
    const startDuel = (e) => {
        e.preventDefault()
        initializeDuel(receiverId)
        setReceiver(false)
        setDuelStarted(true)
    }
    // Initializes Duel, Sets receiver variable to false as you are the initiator and duelStarted variable to true which will show BusinessList
    const handleSelectChange = (event) => {
        if(event.target.value === "0" || event.target.value === sessionStorage.getItem("app_user_id")){
            setButtonDisabled(true)
        }else{
            setReceiverId(parseInt(event.target.value))
            setButtonDisabled(false)
        }
    }
    // handles the button being disabled or not based on the select option cannot choose yourself or no one
    // sets receiverId to your selected duel recipiant.. maybe doesnt need to be a state variable

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