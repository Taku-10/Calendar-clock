import { useState } from "react";
import "./Clock.css";
export default function Clock() {
  const [time, setTime] = useState(new Date());

  setInterval(() => {
    setTime(new Date());
  }, 1000);

  return (
    <div className="clock-container">
      <h1 className="clock">{time.toLocaleTimeString()}</h1>
    </div>
  );
}
