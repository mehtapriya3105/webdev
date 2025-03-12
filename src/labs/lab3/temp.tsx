import  { useState } from "react";

export default function Abc() {
  const [a, setb] = useState({ c: "q", d: 27 });

  const x = (e: { target: { value: any; }; }) => setb({ ...a, c: e.target.value });
  const y = (s: { target: { value: string; }; }) => setb({ ...a, d: parseInt(s.target.value) });

  return (
    <div>
      <input id="r" value={a.c} onChange={x} />
      <input id="t" value={a.d} onChange={y} />
      {JSON.stringify(a, null, 2)}
    </div>
  );
}