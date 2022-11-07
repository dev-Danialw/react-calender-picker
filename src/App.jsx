import React, { useState } from "react";
import "./App.css";

const calendarDates = Array(31)
  .fill(0)
  .map((e, i) => i);

function App() {
  const [chosenType, setChosenType] = useState("start");
  const [selectedDate, setSelectedDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleDateClick = (chosenDay) => {
    // if user chose before our current range
    if (selectedDate && chosenDay < selectedDate) {
      setSelectedDate(chosenDay);
      return setChosenType("end");
    }

    // if user chose after our current range
    if (endDate && chosenDay > endDate) {
      setEndDate(chosenDay);
      return setChosenType("end");
    }

    if (chosenType === "start") {
      setSelectedDate(chosenDay);
      setChosenType("end");
      return;
    }

    if (chosenType === "end") {
      setEndDate(chosenDay);
    }
  };

  return (
    <>
      <div className="date-chooser">
        <button
          className="date-chooser-button"
          onClick={() => setChosenType("start")}
        >
          Start Date <span>{selectedDate}</span>
        </button>
        <button
          className="date-chooser-button"
          onClick={() => setChosenType("end")}
        >
          End Date <span>{endDate}</span>
        </button>
      </div>

      <div className="calendar">
        {calendarDates.map((day, index) => {
          const dayNumber = day + 1;

          return (
            <div
              key={index}
              className="calendar-day"
              onClick={() => handleDateClick(dayNumber)}
            >
              {dayNumber}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
