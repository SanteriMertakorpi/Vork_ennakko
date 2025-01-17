import React from "react";

const MonthlySummary = () => {
    return(
        <div className="p-4 overflow-x-auto">
            <table className="table-auto border-collapse border border-gray-300 w-full text-center">
                <thead>
                    <tr className="bg-mainbackground text-navbarbackground">
                        <th className="border border-gray-300 px-2 py-1">Päivämäärä</th>
                        <th className="border border-gray-300 px-2 py-1">Työaika</th>
                        <th className="border border-gray-300 px-2 py-1">Matkustusaika</th>
                        <th className="border border-gray-300 px-2 py-1">Työpäivät (kpl)</th>
                        <th className="border border-gray-300 px-2 py-1">Sairauspäivät (kpl)</th>
                        <th className="border border-gray-300 px-2 py-1">Kokopäivärahat</th>
                        <th className="border border-gray-300 px-2 py-1">Osapäivärahat</th>
                        <th className="border border-gray-300 px-2 py-1">Ylityötunnit</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Table body content will go here */}
                </tbody>
            </table>            
        </div>
    );
};
export default MonthlySummary;
