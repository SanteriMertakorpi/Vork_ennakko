import React from "react";
import Header from "./header";
import Calendar from "./calendar";
import StartDWorkDay from "./startWorkDay";

const Main = () => {
    return(
        <div className="bg-sky-950 min-h-screen">
            <Header />
            <div className="bg-mainbackground  rounded-t-3xl min-h-screen">
                <Calendar />
                <StartDWorkDay />
            </div>
            
        </div>
        
    )
};

export default Main;