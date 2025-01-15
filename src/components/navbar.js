import React, {useState} from "react";
const Navbar = () => {
    const [activeTab, setActivetab] = useState("tyoaika");

    const tabs = [
        {id: "tyoaika", label: "Työaika"},
        {id: "koonti", label: "Koonti"}
    ];

    const getTabPositions = (tabId) => {
        return tabs.findIndex((tab) => tab.id === tabId);
    };

    return(
        <div className="relative flex justify-center items-center bg-navbarbackground p-2 rounded-full w-fit mx-auto my-2">
            <div className="absolute top-0 left-0 h-full bg-white rounded-full transition-all duration-300"
            style={{
                width: `${100 / tabs.length}%`,
                transform: `translateX(${getTabPositions(activeTab) * 100}%)`
            }}
            ></div>
            {tabs.map((tab) => (
                <button 
                    key={tab.id}
                    onClick={() => setActivetab(tab.id)}
                    className={`relative z-10 px-8 py-2 rounded-full text-sm font-bold transition-colors duration-300
                        ${
                            activeTab === tab.id
                            ? "text-blue-900"
                            : "text-white hover:text-gray-300"
                        }
                    `}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
};
export default Navbar;
