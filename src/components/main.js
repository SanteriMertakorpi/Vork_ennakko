import React from "react";
import Header from "./header";
import Calendar from "./calendar";
import StartDWorkDay from "./startWorkDay";

const Main = () => {
    return(
        <div className="bg-slate-200 min-h-screen">
            <Header />
            <Calendar />
            <StartDWorkDay />
        </div>
        
    )
};

export default Main;