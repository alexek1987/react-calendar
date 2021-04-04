import { useState } from "react";
import { monthToString } from "./functions/monthToString";
import { useEvent } from "./contexts/EventContext";
import {
  startOfMonth,
  endOfMonth,
  isSameMonth,
  isSameDay,
  addDays,
  format,
  addMonths,
  subMonths,
  startOfWeek,
  endOfWeek,
} from "date-fns";
import AddEvent from "./AddEvent";

function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [mousePosition, setMousePosition] = useState({ x: null, y: null });

  const onDateClick = (day) => setSelectedDate(day);
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const userClick = (e) => {
    if (mousePosition) {
      setMousePosition({ x: e.clientX, y: e.clientY });
    }
  };

  return (
    <div className="calendar">
      {mousePosition.x && mousePosition.y && (
        <AddEvent
          setMousePosition={setMousePosition}
          mousePosition={mousePosition}
          selectedDate={selectedDate}
        />
      )}
      <RenderHeader
        currentMonth={currentMonth}
        nextMonth={nextMonth}
        prevMonth={prevMonth}
      />
      <RenderDays currentMonth={currentMonth} />
      <RenderCells
        userClick={userClick}
        currentMonth={currentMonth}
        selectedDate={selectedDate}
        onDateClick={onDateClick}
      />
    </div>
  );
}

export default Calendar;

function RenderHeader({ currentMonth, nextMonth, prevMonth }) {
  return (
    <div className="header row flex-middle">
      <div className="col col-start">
        <div className="icon" onClick={prevMonth}>
          chevron_left
        </div>
      </div>
      <div className="col col-center">
        <span>
          {monthToString(currentMonth) +
            " " +
            new Date(currentMonth).getFullYear()}
        </span>
      </div>
      <div className="col col-end" onClick={nextMonth}>
        <div className="icon">chevron_right</div>
      </div>
    </div>
  );
}

function RenderDays({ currentMonth }) {
  const dateFormat = "dd";
  const days = [];

  let startDate = startOfWeek(currentMonth);

  for (let i = 0; i < 7; i++) {
    days.push(
      <div className="col col-center" key={i}>
        {format(addDays(startDate, i), dateFormat)}
      </div>
    );
  }

  return <div className="days row">{days}</div>;
}

function RenderCells({ currentMonth, selectedDate, onDateClick, userClick }) {
  const { events } = useEvent();
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const dateFormat = "d";
  const rows = [];

  let days = [];
  let day = startDate;
  let formattedDate = "";

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, dateFormat);
      const cloneDay = day;
      days.push(
        <div
          className={`col cell ${
            !isSameMonth(day, monthStart)
              ? "disabled"
              : isSameDay(day, selectedDate)
              ? "selected"
              : ""
          }`}
          key={day}
          onClick={(e) => {
            onDateClick(cloneDay);
            userClick(e);
          }}>
          <div style={{ overflow: "scroll" }}>
            {events.map(
              (event) =>
                new Date(event.date).getDate() ===
                  new Date(cloneDay).getDate() &&
                new Date(event.date).getMonth() ===
                  new Date(currentMonth).getMonth() && (
                  <div key={event._id}>{event.event}</div>
                )
            )}
          </div>
          <span className="number">{formattedDate}</span>
          <span className="bg">{formattedDate}</span>
        </div>
      );
      day = addDays(day, 1);
    }
    rows.push(
      <div className="row" key={day}>
        {days}
      </div>
    );
    days = [];
  }
  return <div className="body">{rows}</div>;
}
