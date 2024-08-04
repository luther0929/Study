import { useState } from "react";

const Initialdays = [
  { id: 0, name: "sun", hours: 0 },
  { id: 1, name: "mon", hours: 0 },
  { id: 2, name: "tue", hours: 0 },
  { id: 3, name: "wed", hours: 0 },
  { id: 4, name: "thu", hours: 0 },
  { id: 5, name: "fri", hours: 0 },
  { id: 6, name: "sat", hours: 0 },
];

export default function App() {
  const [days, setDays] = useState(Initialdays);

  function handleHourChange(dayId, value) {
    setDays((days) =>
      days.map((day) => (day.id === dayId ? { ...day, hours: value } : day))
    );
  }

  return (
    <div>
      <Earnings days={days} />
      <Schedule days={days} onHourChange={handleHourChange} />
    </div>
  );
}

function Earnings({ days }) {
  const [rate, setRate] = useState(0);
  const [tax, setTax] = useState(0);
  const [frequency, setFrequency] = useState("weekly");
  let hoursWorked =
    frequency === "fortnightly"
      ? days.reduce((acc, day) => acc + day.hours, 0) * 2
      : days.reduce((acc, day) => acc + day.hours, 0);
  console.log(hoursWorked);
  let taxAmount = (hoursWorked * rate * (tax / 100))
    .toFixed(2)
    .toLocaleString();
  let grossEarnings = (hoursWorked * rate).toFixed(2).toLocaleString();
  let netEarnings = Number(
    (grossEarnings - taxAmount).toFixed(2)
  ).toLocaleString();

  return (
    <div className="earnings">
      <Net netEarnings={netEarnings} />
      <div className="earningsForm">
        <form className="form">
          <label>Rate</label>
          <input value={rate} onChange={(e) => setRate(e.target.value)} />

          <label>Tax%</label>
          <input value={tax} onChange={(e) => setTax(e.target.value)} />

          <label>Frequency</label>
          <select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
          >
            <option value="weekly">Weekly</option>
            <option value="fortnightly">Fortnightly</option>
          </select>
        </form>
        <div className="summary">
          <label>
            Gross earnings
            <h3> ${grossEarnings}</h3>
          </label>
          <label>
            Tax total<h3> ${taxAmount}</h3>
          </label>
          <label>
            Total hours<h3>{hoursWorked}</h3>
          </label>
        </div>
      </div>
    </div>
  );
}

function Net({ netEarnings }) {
  return (
    <div className="net">
      <h2>Net Earnings</h2>
      <h1>${netEarnings}</h1>
    </div>
  );
}

function Schedule({ days, onHourChange }) {
  return (
    <div className="schedule">
      <h1>Schedule</h1>
      <div className="days">
        {days.map((day) => (
          <Day day={day} onHourChange={onHourChange} key={day.id} />
        ))}
      </div>
    </div>
  );
}

function Day({ day, onHourChange }) {
  function sliderThumb({ day }) {
    if (day.name === "sun") return "sunday";
    if (day.name === "mon") return "monday";
    if (day.name === "tue") return "tuesday";
    if (day.name === "wed") return "wednesday";
    if (day.name === "thu") return "thursday";
    if (day.name === "fri") return "friday";
    if (day.name === "sat") return "saturday";
  }

  return (
    <div className={sliderThumb({ day })}>
      <h3>{day.hours}</h3>
      <input
        type="range"
        min={0}
        max={8}
        step={1}
        value={day.hours}
        onChange={(e) => onHourChange(day.id, Number(e.target.value))}
      ></input>
    </div>
  );
}
