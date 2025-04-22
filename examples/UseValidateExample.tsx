import React, { useState } from "react";
import { useValidate } from "../src/hooks/useValidate";

export const UseValidateExample = () => {
  const { validate } = useValidate();
  const [value, setValue] = useState("");

  const { valid, error } = validate("email", value);

  return (
    <div>
      <input
        type="email"
        placeholder="Email"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {error && <p>{error}</p>}
      <p>Valid: {valid ? "Yes" : "No"}</p>
    </div>
  );
};
