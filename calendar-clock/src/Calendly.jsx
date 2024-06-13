import { useState } from "react";
import "./Calendly.css";

export default function Calendly() {
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState({});

  // Get the number of days in the current month
  const daysInMonth = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();

  // Get the day of the week the first day of the month falls on
  const firstDayOfMonth = new Date(
    date.getFullYear(),
    date.getMonth(),
    1
  ).getDay();

  // Array of days to display in the calendar
  const days = [];
  // Fill the array with empty strings for the days before the first day of the month
  for (let i = 1; i <= daysInMonth + firstDayOfMonth; i++) {
    if (i > firstDayOfMonth) {
      days.push(i - firstDayOfMonth);
    } else {
      days.push("");
    }
  }

  function handleClick(day) {
    setSelectedDate(day);

    // Prompt user to enterevent for the selected day on the calendar
    const event = window.prompt(
      `Enter event for ${date.toLocaleString("default", {
        month: "long",
      })} ${day}, ${date.getFullYear()}`
    );

    // If an event is entered , dd it to the events list
    if (event) {
      // YYYY-MM-DD = key
      const dayKey = `${date.getFullYear()} - ${date.getMonth() + 1} - ${day}`;
      // Add event to aarray of events
      const newEvent = { [dayKey]: [...(events[dayKey] || []), event] };
      setEvents((oldEvents) => ({ ...oldEvents, ...newEvent }));
    }
  }

  return (
    <div className="calendar">
      <h2 className="date-string">
        {date.toLocaleString("default", { month: "long" })} {date.getFullYear()}
      </h2>
      <table>
        <thead>
          <tr>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(Math.ceil(days.length / 7))].map((_, weekIndex) => (
            <tr key={weekIndex}>
              {[...Array(7)].map((_, dayIndex) => {
                const day = days[weekIndex * 7 + dayIndex];
                const dayKey = `${date.getFullYear()} - ${
                  date.getMonth() + 1
                } - ${day}`;

                const eventForDay = events[dayKey];

                return (
                  <td key={dayIndex} onClick={() => handleClick(day)}>
                    {day !== "" && (
                      <>
                        <div>{day}</div>
                        {eventForDay &&
                          eventForDay.map((event, index) => (
                            <div key={index} className="event">
                              {event}
                            </div>
                          ))}
                      </>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
