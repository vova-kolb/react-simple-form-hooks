import React from "react";
import { useForm } from "../src/hooks/useForm";

export const BasicForm = () => {
  const {
    inputs,
    errors,
    isValid,
    values,
    handleSubmit,
    reset,
  } = useForm(["username", "email", "password"]);

  const onSubmit = (vals: typeof values) => {
    console.log("Submitted:", vals);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input placeholder="Username" {...inputs.username} />
      {errors.username && <p>{errors.username}</p>}

      <input placeholder="Email" {...inputs.email} />
      {errors.email && <p>{errors.email}</p>}

      <input type="password" placeholder="Password" {...inputs.password} />
      {errors.password && <p>{errors.password}</p>}

      <button type="submit" disabled={!isValid}>Submit</button>
      <button type="button" onClick={reset}>Reset</button>
    </form>
  );
};
