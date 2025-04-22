import { useMemo } from "react";

type ValidationRule = {
  test: RegExp | ((value: string) => boolean);
  message: string;
};

type ValidationSchema = Record<string, ValidationRule>;

const defaultRules: ValidationSchema = {
  username: {
    test: /^[a-zA-Z0-9_]{3,16}$/,
    message:
      "Username must be 3-16 characters and contain only letters, numbers, or underscores.",
  },
  email: {
    test: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "Invalid email address.",
  },
  password: {
    test: /^(?=.*[A-Z])(?=.*\d).{6,}$/,
    message:
      "Password must contain at least 6 characters, one uppercase letter, and one number.",
  },
  phone: {
    test: /^\+?\d{10,14}$/,
    message: "Invalid phone number format.",
  },
};

export const useValidate = (customRules?: Partial<ValidationSchema>) => {
  const rules = useMemo(
    () => ({ ...defaultRules, ...customRules }),
    [customRules]
  );

  const validate = (name: string, value: string) => {
    const rule = rules[name];
    if (!rule) {
      console.warn(`No validation rule for "${name}"`);
      return { valid: true, error: null };
    }

    const isValid =
      typeof rule.test === "function"
        ? rule.test(value)
        : rule.test.test(value);

    return {
      valid: isValid,
      error: isValid ? null : rule.message,
    };
  };

  return { validate };
};
