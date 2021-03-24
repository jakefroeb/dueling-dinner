import { useState } from "react"
import { BusinessList } from "./businesses/BusinessList"
import { BusinessProvider } from "./businesses/BusinessProvider"
import { CompletedDuelList } from "./duels/CompletedDuelList"
import { DuelProvider } from "./duels/DuelProvider"
import { PendingDuelList } from "./duels/PendingDuelList"
import { UserProvider } from "./users/UserProvider"
import { UserSelect } from "./users/UserSelect"

export const Home = () => {
    const [duelStarted, setDuelStarted] = useState(false)

    return <div className="contentContainer">
            <UserProvider>
                <BusinessProvider>
                    <DuelProvider>
                        {/* duel started state variable that controls what is displayed*/}
                        {!duelStarted ? 
                            <>
                                <div className="startDuel">
                                    <h3>Start a duel</h3>
                                    <UserSelect setDuelStarted = {setDuelStarted}/>   
                                    {/* user select is responsible for starting a new duel */}
                                </div>
                                <div className="pendingDuels">
                                    <PendingDuelList setDuelStarted = {setDuelStarted}/> 
                                    <CompletedDuelList/>   
                                </div>    
                                {/* Pending duel List for duels that have been received from other users
                                Completed Duel List for completed duels */}
                            </>
                        : <></>}
                        {duelStarted ?
                            <div className="duelInProgress">
                                <h3>Duel in Progress</h3> 
                                <BusinessList setDuelStarted={setDuelStarted}/>  
                                {/* Business List responsible for when a duel starts */}
                            </div> 
                        : <></>}
                        <div className="completedDuels"></div>
                    </DuelProvider>
                </BusinessProvider>
            </UserProvider>
        </div>
}