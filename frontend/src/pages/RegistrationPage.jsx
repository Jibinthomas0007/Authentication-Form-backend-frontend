import { useDispatch } from "react-redux";
import { registerUser } from "../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";

import FormWrapper from "../components/form/FormWrapper";
import Input from "../components/form/Input";
import Button from "../components/form/Button";

import useFormValidation from "../hooks/useFormValidation";
import { registerSchema } from "../validations/authSchemas";
import { getErrorMessage } from "../utils/errorHandler";
import { addToast } from "../features/toast/toastSlice";

export default function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useFormValidation(registerSchema);

  const onSubmit = async (data) => {
    const res = await dispatch(registerUser(data));

    if (res.meta.requestStatus === "fulfilled") {
      dispatch(addToast({
        type: "success",
        message: "Account created successfully 🎉",
      }));

      navigate("/");
    } else {
      dispatch(addToast({
        type: "error",
        message: getErrorMessage(res.payload),
      }));
    }
  };

  return (
    <FormWrapper title="Create Account" onSubmit={handleSubmit(onSubmit)}>

      <Input label="Full Name" {...register("fullname")} error={errors.fullname?.message} />
      <Input label="Email or Phone" {...register("login")} error={errors.login?.message} />
      <Input label="Password" type="password" {...register("password")} error={errors.password?.message} />
      <Input label="Confirm Password" type="password" {...register("password_confirmation")} error={errors.password_confirmation?.message} />

      <Button loading={isSubmitting} loadingText="Creating account..." disabled={!isValid}>
        Register
      </Button>

      <p className="text-center text-sm text-gray-500 mt-5">
        Already have an account?
        <Link className="text-blue-500 ml-1" to="/login">
          Login
        </Link>
      </p>
    </FormWrapper>
  );
}