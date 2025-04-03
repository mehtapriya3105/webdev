import { SetStateAction, useState } from "react";
import { FormControl } from "react-bootstrap";

export default function StringStateVariables() {
  const [fullName, setFullName] = useState("John");

  const handleNameChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setFullName(e.target.value);
  };

  return (
    <div>
      <h2>String State Variables</h2>
      <p>{fullName}</p>
      <FormControl
        value={fullName}
        onChange={handleNameChange}
        placeholder="Full Name"
      />
      <hr />
    </div>
  );
}