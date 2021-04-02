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

function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const [selectedDate, setSelectedDate] = useState(new Date());

  const onDateClick = (day) => setSelectedDate(day);

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  return (
    <div className="calendar">
      <RenderHeader
        currentMonth={currentMonth}
        nextMonth={nextMonth}
        prevMonth={prevMonth}
      />
      <RenderDays currentMonth={currentMonth} />
      <RenderCells
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

function RenderCells({ currentMonth, selectedDate, onDateClick }) {
  const { events } = useEvent();
  console.log(events);
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const dateFormat = "d";
  const rows = [];

  let days = [];
  let day = startDate;
  let formattedDate = "";

  console.log(startDate);
  console.log(endDate);
  console.log(day);

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
          onClick={() => onDateClick(cloneDay)}
        >
          <span className="number">{formattedDate}</span>
          <span className="bg">{formattedDate}</span>
          <div>
            {events.map(
              (event) =>
                new Date(event.date).getDate() === cloneDay &&
                new Date(event.date).getMonth() ===
                  new Date(currentMonth).getMonth() && <div>{event.event}</div>
            )}
          </div>
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
