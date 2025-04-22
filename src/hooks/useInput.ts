import { useReducer, useCallback } from "react";
import { useValidate } from "./useValidate";

interface InputState {
  value: string;
  touched: boolean;
  valid: boolean;
  error: string | null;
}

type Action =
  | { type: "CHANGE"; payload: string }
  | { type: "BLUR" }
  | { type: "RESET" }
  | { type: "SET_TOUCHED"; payload: boolean };

const inputReducer = (state: InputState, action: Action): InputState => {
  switch (action.type) {
    case "CHANGE":
      return { ...state, value: action.payload };
    case "BLUR":
      return { ...state, touched: true };
    case "RESET":
      return { value: "", touched: false, valid: true, error: null };
    case "SET_TOUCHED":
      return { ...state, touched: action.payload };
    default:
      return state;
  }
};

export const useInput = (name: string, initialValue = "") => {
  const { validate } = useValidate();

  const initialValidation = validate(name, initialValue);
  const [state, dispatch] = useReducer(inputReducer, {
    value: initialValue,
    touched: false,
    valid: initialValidation.valid,
    error: initialValidation.error,
  });

  const { value, touched } = state;
  const { valid, error } = validate(name, value);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "CHANGE", payload: e.target.value });
  }, []);

  const onBlur = useCallback(() => {
    dispatch({ type: "BLUR" });
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: "RESET" });
  }, []);

  const setTouched = useCallback((v: boolean) => {
    dispatch({ type: "SET_TOUCHED", payload: v });
  }, []);

  return {
    value,
    onChange,
    onBlur,
    touched,
    valid,
    error: touched ? error : null,
    reset,
    setTouched,
  };
};
