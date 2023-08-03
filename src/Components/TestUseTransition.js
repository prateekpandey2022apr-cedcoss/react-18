import React, { useState, useTransition } from "react";
import { fakeNames } from "../data";

const TestUseTransition = () => {
  const [input, setinput] = useState("");
  const [data, setData] = useState(fakeNames);

  const [isPending, startTransition] = useTransition();

  const handle = (e) => {
    const value = e.target.value;
    setinput(value);
    startTransition(() => {
      const filteredNames = fakeNames.filter((name) =>
        name.toLowerCase().includes(input.toLowerCase())
      );
      setData(filteredNames);
    });
  };

  return (
    <div className="App">
      <div>
        <input value={input} onChange={handle} />
      </div>
      <div>
        {isPending ? (
          <p>Loading</p>
        ) : (
          <ul>
            {data.map((name, index) => {
              return <li key={index}>{name}</li>;
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TestUseTransition;
