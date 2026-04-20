import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export default function useFormValidation(schema) {
  return useForm({
    resolver: yupResolver(schema),
    mode: "onChange", // 🔥 real-time validation
  });
}