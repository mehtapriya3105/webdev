import { useState } from "react";
import { FormControl, Input } from "@mui/material";

export default function DateStateVariable() {
  const [startDate, setStartDate] = useState(new Date());

  const dateObjectToHtmlDateString = (date:Date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div id="wd-date-state-variables">
      <h2>Date State Variables</h2>
      <h3>{JSON.stringify(startDate)}</h3>
      <h3>{dateObjectToHtmlDateString(startDate)}</h3>
      <FormControl>
        <Input
          type="date"
          value={dateObjectToHtmlDateString(startDate)}
          onChange={(e) => setStartDate(new Date(e.target.value))}
        />
      </FormControl>
      <hr/>
    </div>
  );
}