import React, { useState, useEffect } from "react";

const StartDWorkDay = () => {
  const [startWorkDay, setStartWorkDay] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [pauseTime, setPauseTime] = useState(0);

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

  const date = new Date();
  const hours = date.getHours();
  let minutes = date.getMinutes();
  if(minutes < 10){
    minutes = "0" + minutes;
  }
  const showTime = hours + ":" + minutes;

  if (startWorkDay) {
    return (
        <div>

            
            <div className="grid grid-cols-1 gap-4 bg-slate-50 m-6">
                <div className="grid justify-items-center p-4">
                    <p className="text-xs">Työmaalle kirjautuminen</p>
                    <p className="text-2xl">{showTime}</p>
                    <button className="w-5/6 h-14 rounded-md bg-green-600">
                        Kirjaudu työmaalle
                    </button>
                </div>
                
            </div>
            <div className="grid grid-cols-1 gap-4 bg-slate-50 m-6">
                <div className="grid justify-items-center p-4">
                    <p className="text-xs">Työaika</p>
            
                    <p className="text-xl">{formatTime(elapsedTime)}</p>
                    <div className="flex justify-between w-5/6">
                        <button
                        className="w-1/2 h-14 rounded-md bg-yellow-600 mr-2"
                        onClick={() => {
                                setIsPaused(!isPaused);
                                if (!isPaused) {
                                    setPauseTime(pauseTime + (new Date() - startTime - elapsedTime * 1000));
                                }
                            }}
                        >
                            {isPaused ? "Jatka" : "Tauko"}
                        </button>
                        <button
                            className="w-1/2 h-14 rounded-md bg-red-600"
                            onClick={() => {
                                setStartWorkDay(false);
                                setElapsedTime(0);
                                setPauseTime(0);
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
    <div className="grid grid-cols-1 gap-4 bg-slate-50 m-6">
      <div className="grid justify-items-center p-4">
        <p className="text-xs">Aloitusaika</p>
        <p className="text-2xl">{showTime}</p>
        <button
          className="w-5/6 h-14 rounded-md bg-green-600"
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