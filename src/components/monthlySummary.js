import React, {useState, useEffect} from "react";
import workInformationService from "../services/workInformation";

const MonthlySummary = () => {
    const [workInformation, setWorkInformation] = useState([]);

    useEffect(() => {
        workInformationService.getAll().then((data) => {
            setWorkInformation(data.workEntries);
        }).catch((error) => {
            console.error("Error fetching work information:", error);
        });
    }, []);

    return(
        <div>
            <h1 className="text-center text-navbarbackground font-bold relative pt-2">KUUKAUSIKOHTAINEN YHTEENVETO TAMMIKUU</h1>
            <div className="p-4 overflow-x-auto">
                
                <table className="table-auto border-collapse border border-gray-300 w-full text-center whitespace-nowrap">
                    <thead>
                        <tr className="bg-mainbackground text-navbarbackground">
                            <th className="border border-gray-300 px-2 py-1">Päivämäärä</th>
                            <th className="border border-gray-300 px-2 py-1">Työaika</th>
                            <th className="border border-gray-300 px-2 py-1">Matkustusaika</th>
                            <th className="border border-gray-300 px-2 py-1">Kokopäivärahat</th>
                            <th className="border border-gray-300 px-2 py-1">Osapäivärahat</th>
                            <th className="border border-gray-300 px-2 py-1">Sairauspäivät</th>
                            <th className="border border-gray-300 px-2 py-1">Ylityötunnit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(workInformation).map(([date, entry]) => (
                            <tr key={date} className="text-navbarbackground">
                                <td className="border border-gray-300 px-2 py-1">{date}</td>
                                <td className="border border-gray-300 px-2 py-1">
                                    {entry.workingHours.formatted} ({entry.workingHours.decimal})
                                </td>
                                <td className="border border-gray-300 px-2 py-1">{entry.travelTime}</td>
                                <td className="border border-gray-300 px-2 py-1">
                                    {entry.fullDayAllowance ? "Kyllä" : "Ei"}
                                </td>
                                <td className="border border-gray-300 px-2 py-1">
                                    {entry.halfDayAllowance ? "Kyllä" : "Ei"}
                                </td>
                                <td className="border border-gray-300 px-2 py-1">
                                    {entry.sick ? "Kyllä" : "Ei"}
                                </td>
                                <td className="border border-gray-300 px-2 py-1">
                                    {entry.overtimeHours.formattedOverTime} ({entry.overtimeHours.decimalOverTime})
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>            
            </div>
        </div>
    );
};
export default MonthlySummary;
