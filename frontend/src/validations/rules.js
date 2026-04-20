import * as yup from "yup";
import messages from "./messages";

// 🔥 Email OR Phone validation
export const loginRule = yup
  .string()
  .required(messages.required)
  .test(
    "is-valid-login",
    "Enter a valid email or phone number",
    (value) => {
      if (!value) return false;

      const isEmail = /^\S+@\S+\.\S+$/.test(value);
      const isPhone = /^[0-9]{10}$/.test(value);

      return isEmail || isPhone;
    }
  );

// 🔥 Strong Password Rule (Production Level)
export const passwordRule = yup
  .string()
  .required(messages.required)
  .min(8, "Password must be at least 8 characters")
  .matches(/[A-Z]/, "Must contain at least 1 uppercase letter")
  .matches(/[a-z]/, "Must contain at least 1 lowercase letter")
  .matches(/[0-9]/, "Must contain at least 1 number")
  .matches(/[@$!%*?&]/, "Must contain at least 1 special character");

// 🔥 Name rule
export const nameRule = yup
  .string()
  .required(messages.required)
  .min(3, "Minimum 3 characters")
  .matches(/^[a-zA-Z\s]+$/, "Only letters are allowed");