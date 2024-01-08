import * as yup from "yup";

export const orderSchema = yup.object({
  name: yup
    .string()
    .matches(/^[a-zA-Zа-яА-Я\s]+$/, "Name should only contain letters")
    .required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup
    .string()
    .matches(/^\+?[0-9]{7,15}$/, "Invalid phone number")
    .required("Phone number is required"),
});
