import { useContext, useEffect, useState } from "react"
import { Button, Dropdown } from "react-bootstrap"
import { userStorageKey } from "../auth/authSettings"
import { DuelContext } from "../duels/DuelProvider"
import { UserContext } from "./UserProvider"

export const UserSelect = ({setDuelStarted}) => {
    const {users, getUsers} = useContext(UserContext)
    const [buttonDisabled, setButtonDisabled] = useState(true)
    const {initializeDuel, setReceiver} = useContext(DuelContext)
    const [receiverId, setReceiverId] = useState(0)
    const [userName, setUserName] = useState("")

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
    const handleSelectChange = (eventKey, event) => {
        if(eventKey.split(",")[0] === sessionStorage.getItem(userStorageKey)){
            setButtonDisabled(true)
        }else{
            setReceiverId(parseInt(eventKey.split(",")[0]))
            setUserName(eventKey.split(",")[1])
            setButtonDisabled(false)
        }
    }
    // handles the button being disabled or not based on the select option cannot choose yourself or no one
    // sets receiverId to your selected duel recipiant.. maybe doesnt need to be a state variable

    return(
        <>
        <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                {buttonDisabled? "Choose a user" : userName}
            </Dropdown.Toggle>
        <Dropdown.Menu>
        {users?.map(user => <Dropdown.Item key={user.id} eventKey={[user.id, user.name]} onSelect={handleSelectChange} disabled={user.id === parseInt(sessionStorage.getItem(userStorageKey))}>{user.name}</Dropdown.Item>)}
        </Dropdown.Menu>
        </Dropdown>
        <Button onClick={startDuel} disabled={buttonDisabled}>Start Duel</Button>
        </>
    )
}