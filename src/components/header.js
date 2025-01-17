import React from "react";
import Navbar from "./navbar";
const Header = ({workTimePage, setWorkTimePage}) => {
    return(
        <div className="bg-sky-950">
            <div className="flex justify-between items-center p-4 text-white min-h-24">
                
                <h2 className="font-bold">Kellokortti</h2>
                
                
            </div>
            <Navbar workTimePage={workTimePage} setWorkTimePage={setWorkTimePage} />
        </div>
        
    )
};

export default Header;