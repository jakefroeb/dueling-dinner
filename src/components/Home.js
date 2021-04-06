import { useState } from "react"
import { BusinessList } from "./businesses/BusinessList"
import { BusinessProvider } from "./businesses/BusinessProvider"
import { CompletedDuelList } from "./duels/CompletedDuelList"
import { DuelProvider } from "./duels/DuelProvider"
import { PendingDuelList } from "./duels/PendingDuelList"
import { UserProvider } from "./users/UserProvider"
import { UserSelect } from "./users/UserSelect"
import "./Home.css"

export const Home = () => {
    const [duelStarted, setDuelStarted] = useState(false)

    return <div className="contentContainer">
            <UserProvider>
                <BusinessProvider>
                    <DuelProvider>
                        {/* duel started state variable that controls what is displayed*/}
                        {!duelStarted ? 
                            <>
                            <div className="duelContainer">
                                <div className="pendingDuels">
                                    <PendingDuelList setDuelStarted = {setDuelStarted}/> 
                                </div>    
                                <div className="startDuel">
                                    <h3>Start a duel</h3>
                                    <UserSelect setDuelStarted = {setDuelStarted}/>   
                                    {/* user select is responsible for starting a new duel */}
                                </div>
                                <div className="completedDuels">
                                    <CompletedDuelList/>   
                                </div>
                            </div>
                                {/* Pending duel List for duels that have been received from other users
                                Completed Duel List for completed duels */}
                            </>
                        : <></>}
                        {duelStarted ?
                            <div className="duelInProgress">
                                <BusinessList setDuelStarted={setDuelStarted}/>  
                                {/* Business List responsible for when a duel starts */}
                            </div> 
                        : <></>}
                    </DuelProvider>
                </BusinessProvider>
            </UserProvider>
        </div>
}