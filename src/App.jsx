import React, { useState } from "react";
import styled, { css } from "styled-components";
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
      <StyledDateChooser>
        <StyledDateChooserButton onClick={() => setChosenType("start")}>
          Start Date <span>{selectedDate}</span>
        </StyledDateChooserButton>
        <StyledDateChooserButton onClick={() => setChosenType("end")}>
          End Date <span>{endDate}</span>
        </StyledDateChooserButton>
      </StyledDateChooser>

      <StyledCalendar>
        {calendarDates.map((day, index) => {
          const dayNumber = day + 1;
          const isSelected =
            dayNumber === selectedDate || dayNumber === endDate;

          return (
            <StyledCalendarDay
              key={index}
              isSelected={isSelected}
              onClick={() => handleDateClick(dayNumber)}
            >
              {dayNumber}
            </StyledCalendarDay>
          );
        })}
      </StyledCalendar>
    </>
  );
}

export default App;

const StyledDateChooser = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const StyledDateChooserButton = styled.button`
  color: #0b204c;
  text-transform: uppercase;
  flex: 1;
  padding: 15px;
  background: none;
  cursor: pointer;
  border: none;
  border-bottom: 2px solid rgba(11, 32, 76, 0.2);
  outline: none;
  border-color: ${(props) => (props.isChoosing ? "#0b204c" : "none")};
  span {
    display: block;
    min-height: 60px;
    font-size: 50px;
  }
`;

const StyledCalendar = styled.div`
  max-width: 400px;
  border-radius: 10px;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  background: #0b204c;
  color: #fff;
  padding: 20px;
`;

const StyledCalendarDay = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  transition: 0.3s ease background;
  border: none;
  outline: none;
  cursor: pointer;
  color: #8096c1;
  background: none;

  ${(props) =>
    props.isSelected &&
    css`
      background: #1a1a1a !important;
      color: #eee;
    `}
`;
