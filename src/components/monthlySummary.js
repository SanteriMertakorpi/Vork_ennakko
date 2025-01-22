import React, {useState, useEffect} from "react";
import workInformationService from "../services/workInformation";

const MonthlySummary = () => {
    const [workInformation, setWorkInformation] = useState([]);

    useEffect(() => {
        const date = new Date();
        const month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
        const currentMonth = `${date.getFullYear()}-${month}`
        workInformationService.getDataOfTheMonth(currentMonth).then((data) => {
            setWorkInformation(data.workEntries);
        }).catch((error) => {
            console.error("Error fetching work information:", error);
        });
    }, []);

    const calculateSummary = () => {
        const summary = {
            workingHours: 0,
            travelTime: 0,
            fullDayAllowance: 0,
            halfDayAllowance: 0,
            sick: 0,
            overtimeHours: 0
        };

        Object.values(workInformation).forEach(entry => {
            summary.workingHours += entry.workingHours.decimal;
            summary.travelTime += entry.travelTime.decimal;
            summary.fullDayAllowance += entry.allowance.fullDayAmount === 0 ? 0 : entry.allowance.fullDayAmount;
            summary.halfDayAllowance += entry.allowance.halfDayAmount === 0 ? 0 : entry.allowance.halfDayAmount;
            summary.sick += entry.sick ? 1 : 0;
            summary.overtimeHours += entry.overtimeHours.decimal;
        });

        return summary;
    };

    const summary = calculateSummary();

    return(
        <div>
            <h1 className="text-center text-navbarbackground font-bold relative pt-2">KUUKAUSIKOHTAINEN YHTEENVETO</h1>
            <h1 className="text-center text-navbarbackground font-bold relative pt-2">TAMMIKUU</h1>
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
                        <tr className="bg-gray-200 text-navbarbackground font-bold">
                            <td className="border border-gray-300 px-2 py-1">Yhteensä</td>
                            <td className="border border-gray-300 px-2 py-1">{summary.workingHours} h</td>
                            <td className="border border-gray-300 px-2 py-1">{summary.travelTime} h</td>
                            <td className="border border-gray-300 px-2 py-1">{summary.fullDayAllowance} €</td>
                            <td className="border border-gray-300 px-2 py-1">{summary.halfDayAllowance} €</td>
                            <td className="border border-gray-300 px-2 py-1">{summary.sick} pv</td>
                            <td className="border border-gray-300 px-2 py-1">{summary.overtimeHours} h</td>
                        </tr>
                        {Object.entries(workInformation).reverse().map(([date, entry]) => (
                            <tr key={date} className="text-navbarbackground">
                                <td className="border border-gray-300 px-2 py-1">{date}</td>
                                <td className="border border-gray-300 px-2 py-1">
                                    {entry.workingHours.formatted} ({entry.workingHours.decimal} h)
                                </td>
                                <td className="border border-gray-300 px-2 py-1">
                                    {entry.travelTime.formatted} ({entry.travelTime.decimal} h)
                                </td>
                                <td className="border border-gray-300 px-2 py-1">
                                    {entry.allowance.fullDayAmount > entry.allowance.halfDayAmount ? entry.allowance.fullDayAmount : 0}
                                </td>
                                <td className="border border-gray-300 px-2 py-1">
                                    {entry.allowance.fullDayAmount > entry.allowance.halfDayAmount ? 0 : entry.allowance.halfDayAmount}
                                </td>
                                <td className="border border-gray-300 px-2 py-1">
                                    {entry.sick ? "Kyllä" : "Ei"}
                                </td>
                                <td className="border border-gray-300 px-2 py-1">
                                    {entry.overtimeHours.formatted} ({entry.overtimeHours.decimal} h)
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
