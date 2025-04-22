import React from "react";
import { useInput } from "../src/hooks/useInput";

export const UseInputExample = () => {
  const input = useInput("username");

  return (
    <div>
      <input placeholder="Username" {...input} />
      {input.error && <p>{input.error}</p>}
      <button onClick={input.reset}>Reset</button>
    </div>
  );
};
