import { useInput } from "./useInput";
import { useMemo, useRef } from "react";

export const useForm = (fieldNames: string[]) => {
  const inputsRef = useRef<Record<string, ReturnType<typeof useInput>>>({});

  useMemo(() => {
    fieldNames.forEach((name) => {
      if (!inputsRef.current[name]) {
        inputsRef.current[name] = useInput(name);
      }
    });
  }, [fieldNames]);

  const inputs = inputsRef.current;

  const values = useMemo(
    () => Object.fromEntries(
      Object.entries(inputs).map(([key, input]) => [key, input.value])
    ),
    [inputs]
  );

  const errors = useMemo(
    () => Object.fromEntries(
      Object.entries(inputs).map(([key, input]) => [key, input.error])
    ),
    [inputs]
  );

  const validities = useMemo(
    () => Object.fromEntries(
      Object.entries(inputs).map(([key, input]) => [key, input.valid])
    ),
    [inputs]
  );

  const isValid = Object.values(inputs).every((input) => input.valid);

  const touchAll = () => {
    Object.values(inputs).forEach((input) => input.setTouched(true));
  };

  const reset = () => {
    Object.values(inputs).forEach((input) => input.reset());
  };

  const handleSubmit =
    (callback: (values: typeof values) => void) =>
    (e: React.FormEvent) => {
      e.preventDefault();
      touchAll();
      if (isValid) callback(values);
    };

  return {
    inputs,
    values,
    errors,
    validities,
    isValid,
    handleSubmit,
    touchAll,
    reset,
  };
};
