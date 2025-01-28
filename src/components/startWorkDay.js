import React, { useState, useEffect } from "react";
import { FaRegCirclePlay } from "react-icons/fa6";
import EditWorkdayInformation from "./editWorkdayInformation";
import { MdOutlineStopCircle, MdOutlinePauseCircle } from "react-icons/md";
import workInformationService from "../services/workInformation";
import DailySumup from "./dailySumup";

/**
 * 
 * @param {int} workTimePage Tilassa oleva sivu
 * @returns Komponentti, joka näyttää aloitusnäkymän työpäivän aloittamiseen ja lopettamiseen
 */
const StartDWorkDay = ( workTimePage ) => {

  //Hakee työpäivän tiedot local storagesta
  const [workdayInformation, setWorkdayInformation] = useState(() => {
    const saved = localStorage.getItem("workdayInformation");
    return saved ? JSON.parse(saved) : {
      startWorkDay: false,
      startTime: null,
      elapsedTime: 0,
      isPaused: false,
      pauseTime: 0,
      signedToWorkSite: false
    };
  });

  const [startWorkDay, setStartWorkDay] = useState(workdayInformation.startWorkDay);
  const [showSumup, setShowSumup] = useState(false);
  const [startTime, setStartTime] = useState(workdayInformation.startTime ? new Date(workdayInformation.startTime) : null);
  const [stopTime, setStopTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(workdayInformation.elapsedTime);
  const [isPaused, setIsPaused] = useState(workdayInformation.isPaused);
  const [pauseTime, setPauseTime] = useState(workdayInformation.pauseTime);
  const [breakStartTime, setBreakStartTime] = useState(null);
  const [breakEndTime, setBreakEndTime] = useState(null);
  const [workTimePageState, setWorkTimePageState] = useState(workTimePage);
  const [summaryData, setSummaryData] = useState(null);
  const [signedToWorkSite, setSignedToWorkSite] = useState(workdayInformation.signedToWorkSite);

  // Työajan ajastimen hallinta
  useEffect(() => {
    let timer;
    if (startWorkDay && !isPaused) {
      timer = setInterval(() => {
        setElapsedTime(Math.floor((new Date() - startTime - pauseTime) / 1000));
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [startWorkDay, isPaused, startTime, pauseTime]);


  // Tallentaa työpäivän tiedot local storageen
  useEffect(() => {
    const workdayInfo = {
      startWorkDay,
      startTime: startTime ? startTime.toISOString() : null,
      elapsedTime,
      isPaused,
      pauseTime,
      signedToWorkSite
    };
    localStorage.setItem("workdayInformation", JSON.stringify(workdayInfo));
  }, [startWorkDay, startTime, elapsedTime, isPaused, pauseTime, signedToWorkSite]);

  /**
   * 
   * @param {int} seconds sekuntien määrä
   * @returns Sekunnit formatoituna tunneiksi ja minuuteiksi
   */
  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    return `${hrs}h ${mins}m `;
  };

  /**
   * 
   * @param {Date} date Aikaleima
   * @returns Aikaleiman formatoituna muotoon hh:mm
   */
  const formatStartandStopTime = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
  };

  /**
   * Lähettää työpäivän tiedot palvelimelle
   * @param {*} summaryData 
   */
  const onAccept = (summaryData) => {
    const workEntry = {
      date: summaryData.date,
      startTime: summaryData.startTimeState,
      endTime: summaryData.endTimeState,
      overtimeHours: summaryData.overtimeHours,
      overtimeMinutes: summaryData.overtimeMinutes,
      breakStart: summaryData.breakStart,
      breakEnd: summaryData.breakEnd,
      travelTimeHours: summaryData.travelTimeHours,
      travelTimeMinutes: summaryData.travelTimeMinutes,
      fullDayAllowance: summaryData.fullDayAllowance,
      halfDayAllowance: summaryData.halfDayAllowance,
      mealCompensation: summaryData.mealCompensation,
      sick: summaryData.sick
    };

    workInformationService.add(workEntry).then(() => {
      console.log("Work entry added successfully");
      setSummaryData(workEntry);
      setWorkTimePageState(workTimePageState + 1);
    }).catch((error) => {
      console.error("Error adding work entry:", error);
    });
  };

  const date = new Date();
  const hours = date.getHours();
  let minutes = date.getMinutes();
  if(minutes < 10){
    minutes = "0" + minutes;
  }
  const showTime = hours + ":" + minutes;

  if (showSumup) {
    return <EditWorkdayInformation 
              onCancel={() => { setShowSumup(false); setStartWorkDay(true); setIsPaused(true); }} 
              onAccept={(summaryData) => { onAccept(summaryData); setShowSumup(false); setBreakStartTime(null); setBreakEndTime(null); setSignedToWorkSite(false); }} 
              startTime={formatStartandStopTime(startTime)} 
              stopTime={formatStartandStopTime(stopTime)} 
              breakStartTime={breakStartTime=== null ? 0 : formatStartandStopTime(breakStartTime)} 
              breakEndTime={breakEndTime=== null ? 0 : formatStartandStopTime(breakEndTime)} 
           />;
  }

  if (summaryData) {
    return (
      <DailySumup summaryData={summaryData} setSummaryData={setSummaryData} />
    );
  }

  if (startWorkDay) {
    return (
        <div>
            <div className="grid grid-cols-1 gap-4 bg-white m-6 rounded-md">
                <div className="grid justify-items-center p-4">
                    <p className="text-xs text-gray-500">Työmaalle kirjautuminen</p>
                    <p className="text-2xl">{showTime}</p>
                    {!signedToWorkSite ?
                      <button 
                        className="w-5/6 h-14 rounded-md bg-green-600 font-semibold text-white my-2"
                        onClick={() => {setSignedToWorkSite(true);}}>
                        Kirjaudu työmaalle
                      </button>
                      :
                      <button
                      className="w-5/6 h-14 rounded-md bg-red-600 font-semibold text-white my-2"
                      onClick={() => {setSignedToWorkSite(false);}}>
                        Kirjaudu ulos työmaalta
                      </button>
                    }
                    
                </div>
            </div>
            <div className="grid grid-cols-1 gap-4 bg-white m-6 rounded-md">
                <div className="grid justify-items-center p-4">
                    <p className="text-xs text-gray-500">Työaika</p>
                    <p className="text-xl">{formatTime(elapsedTime)}</p>
                    <div className="flex justify-between w-full px-4">
                        <button
                        className="w-1/2 h-10 rounded-md bg-white mr-4 border-2 font-semibold my-2"
                        onClick={() => {
                                setIsPaused(!isPaused);
                                if (!isPaused) {
                                    setBreakEndTime(new Date());
                                    setPauseTime(pauseTime + (new Date() - startTime - elapsedTime * 1000));
                                } else {
                                    setBreakStartTime(new Date());
                                }
                            }}
                        >
                            {isPaused 
                            ? 
                            <div className="flex justify-center items-center">
                              <FaRegCirclePlay size={16} className="mr-1"/>
                              <p>Jatka</p>
                            </div>
                            : 
                            <div className="flex justify-center items-center">
                              <MdOutlinePauseCircle size={16} className="mr-1"/>
                              <p>Tauko</p>
                            </div>
                            }
                        </button>
                        <button
                            className="w-1/2 min-w-fit h-10 rounded-md bg-red-600 text-white font-semibold my-2"
                            onClick={() => {
                                setStartWorkDay(false);
                                setStopTime(new Date());
                                setElapsedTime(0);
                                setPauseTime(0);
                                setShowSumup(true);
                            }}
                        >
                          <div className="flex justify-center items-center p-2">
                            <MdOutlineStopCircle size={16} className="m-1"/>
                            <p>Päätä työpäivä</p>
                          </div>
                            
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 bg-white m-6 rounded-md">
      <div className="grid justify-items-center p-4">
        <p className="text-xs text-gray-500">Aloitusaika</p>
        <p className="text-2xl">{showTime}</p>
        <button
          className="mt-4 w-11/12 h-12 rounded-md bg-startbutton text-white text-xl font-semibold"
          onClick={() => {
            setStartWorkDay(true);
            setStartTime(new Date());
          }}
        >
          <div className="flex justify-center items-center">
            <FaRegCirclePlay size={20} className="mr-2 mt-1"/>
            <p>Aloita työpäivä</p>
          </div>
          
        </button>
      </div>
    </div>
  );
};

export default StartDWorkDay;