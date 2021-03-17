import { useState } from "react"
import { BusinessList } from "./businesses/BusinessList"
import { BusinessProvider } from "./businesses/BusinessProvider"
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
                        {!duelStarted ? 
                            <>
                                <div className="startDuel">
                                    <h3>Start a duel</h3>
                                    <UserSelect setDuelStarted = {setDuelStarted}/>                                   
                                </div>
                                <div className="pendingDuels">
                                    <PendingDuelList/>    
                                </div>    
                            </>
                        : <></>}
                        {duelStarted ?
                            <div className="duelInProgress">
                                <h3>Duel in Progress</h3> 
                                <BusinessList setDuelStarted={setDuelStarted}/>  
                            </div> 
                        : <></>}
                        <div className="completedDuels"></div>
                    </DuelProvider>
                </BusinessProvider>
            </UserProvider>
        </div>
}