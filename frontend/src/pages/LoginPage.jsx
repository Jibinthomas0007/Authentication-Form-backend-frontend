import { useDispatch } from "react-redux";
import { loginUser } from "../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";

import FormWrapper from "../components/form/FormWrapper";
import Input from "../components/form/Input";
import Button from "../components/form/Button";

import useFormValidation from "../hooks/useFormValidation";
import { loginSchema } from "../validations/authSchemas";
import { getErrorMessage } from "../utils/errorHandler";
import { addToast } from "../features/toast/toastSlice";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useFormValidation(loginSchema);

  const onSubmit = async (data) => {
    const res = await dispatch(loginUser(data));

    if (res.meta.requestStatus === "fulfilled") {
      const role = res.payload.data.user.role;

      dispatch(addToast({
        type: "success",
        message: "Login successful 🎉",
      }));

      navigate(role === "admin" ? "/admin-dashboard" : "/");
    } else {
      dispatch(addToast({
        type: "error",
        message: getErrorMessage(res.payload),
      }));
    }
  };

  return (
    <FormWrapper title="Welcome Back" onSubmit={handleSubmit(onSubmit)}>
      
      <Input
        label="Email or Phone"
        {...register("login")}
        error={errors.login?.message}
        disabled={isSubmitting}
      />

      <Input
        label="Password"
        type="password"
        {...register("password")}
        error={errors.password?.message}
        disabled={isSubmitting}
      />

      <Button loading={isSubmitting} loadingText="Logging in..." disabled={!isValid}>
        Login
      </Button>

      <p className="text-center text-sm text-gray-500 mt-5">
        Don’t have an account?
        <Link className="text-blue-500 ml-1" to="/register">
          Register
        </Link>
      </p>
    </FormWrapper>
  );
}