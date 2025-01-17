import React, { useState } from "react";
import Header from "./header";
import Calendar from "./calendar";
import StartDWorkDay from "./startWorkDay";
import MonthlySummary from "./monthlySummary";

const Main = () => {

    const [workTimePage, setWorkTimePage] = useState(true)
    return(
        <div className="bg-sky-950 min-h-screen">
            <Header workTimePage={workTimePage} setWorkTimePage={setWorkTimePage}/>
            {(workTimePage) ?
                <div className="bg-mainbackground  rounded-t-3xl min-h-screen">
                <Calendar />
                <StartDWorkDay />
                </div>
                :
                <div className="bg-mainbackground rounded-t-3xl min-h-screen">
                    <MonthlySummary />
                </div>
            }

            
        </div>
        
    )
};

export default Main;