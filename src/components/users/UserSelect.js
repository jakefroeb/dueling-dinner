import { useContext, useEffect, useState } from "react"
import { DuelContext } from "../duels/DuelProvider"
import { UserContext } from "./UserProvider"

export const UserSelect = ({setDuelStarted}) => {
    const {users, getUsers} = useContext(UserContext)
    const [buttonDisabled, setButtonDisabled] = useState(true)
    const {initializeDuel} = useContext(DuelContext)
    const [receiverId, setReceiverId] = useState(0)

    useEffect(()=>{
        getUsers()
    },[])
    
    
    const startDuel = (e) => {
        e.preventDefault()
        initializeDuel(receiverId).then(setDuelStarted(true))
    }
    const handleSelectChange = (event) => {
        if(event.target.value === "0" || event.target.value === sessionStorage.getItem("app_user_id")){
            setButtonDisabled(true)
        }else{
            setReceiverId(parseInt(event.target.value))
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