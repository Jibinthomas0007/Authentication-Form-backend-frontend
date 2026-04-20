import * as yup from "yup";
import { loginRule, passwordRule, nameRule } from "./rules";
import messages from "./messages";

export const loginSchema = yup.object({
  login: loginRule,
  password: passwordRule,
});

export const registerSchema = yup.object({
  fullname: nameRule,
  login: loginRule,
  password: passwordRule,
  password_confirmation: yup
    .string()
    .oneOf([yup.ref("password")], messages.passwordMatch)
    .required(messages.required),
});