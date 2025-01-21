import React, { useState, useEffect } from "react";
import Sumup from "./sumup";
import workInformationService from "../services/workInformation";

const StartDWorkDay = ( workTimePage ) => {
  const [startWorkDay, setStartWorkDay] = useState(false);
  const [showSumup, setShowSumup] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [stopTime, setStopTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [pauseTime, setPauseTime] = useState(0);
  const [breakStartTime, setBreakStartTime] = useState(null);
  const [breakEndTime, setBreakEndTime] = useState(null);
  const [workTimePageState, setWorkTimePageState] = useState(workTimePage);

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

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    return `${hrs}h ${mins}m `;
  };

  const formatStartandStopTime = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
  };

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
    return <Sumup 
              onCancel={() => { setShowSumup(false); setStartWorkDay(true); }} 
              onAccept={(summaryData) => { onAccept(summaryData); setShowSumup(false); setBreakStartTime(null); setBreakEndTime(null); }} 
              startTime={formatStartandStopTime(startTime)} 
              stopTime={formatStartandStopTime(stopTime)} 
              breakStartTime={breakStartTime=== null ? 0 : formatStartandStopTime(breakStartTime)} 
              breakEndTime={breakEndTime=== null ? 0 : formatStartandStopTime(breakEndTime)} 
           />;
  }

  if (startWorkDay) {
    return (
        <div>
            <div className="grid grid-cols-1 gap-4 bg-white m-6 rounded-md">
                <div className="grid justify-items-center p-4">
                    <p className="text-xs text-gray-500">Työmaalle kirjautuminen</p>
                    <p className="text-2xl">{showTime}</p>
                    <button className="w-5/6 h-14 rounded-md bg-green-600 font-semibold text-white my-2">
                        Kirjaudu työmaalle
                    </button>
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
                            {isPaused ? "Jatka" : "Tauko"}
                        </button>
                        <button
                            className="w-1/2 h-10 rounded-md bg-red-600 text-white font-semibold my-2"
                            onClick={() => {
                                setStartWorkDay(false);
                                setStopTime(new Date());
                                setElapsedTime(0);
                                setPauseTime(0);
                                setShowSumup(true);
                            }}
                        >
                            Päätä työpäivä
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
          Aloita työpäivä
        </button>
      </div>
    </div>
  );
};

export default StartDWorkDay;