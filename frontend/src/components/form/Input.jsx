import { forwardRef, useState } from "react";
import { Eye, EyeOff, CheckCircle2 } from "lucide-react";

const Input = forwardRef(
  (
    {
      label,
      type = "text",
      error,
      icon: Icon,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);

    const isPassword = type === "password";

    return (
      <div className="relative mb-6">
        {/* 🔥 INPUT CONTAINER */}
        <div
          className={`relative flex items-center border rounded-xl px-3
            transition-all duration-200 ease-in-out
            ${error ? "border-red-500" : "border-gray-300"}
            ${
              isFocused
                ? "border-gray-500 scale-[1.02] translate-y-[-1px]"
                : "scale-100"
            }
            ${props.disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"}
          `}
        >
          {/* LEFT ICON */}
          {Icon && <Icon className="ml-3 text-gray-400" size={18} />}

          <input
            ref={ref}
            type={isPassword && showPassword ? "text" : type}
            {...props}
            disabled={props.disabled}
            onFocus={() => setIsFocused(true)}
            onBlur={(e) => {
              setIsFocused(false);
              setHasValue(e.target.value.length > 0); // ✅ FIX
            }}
            onChange={(e) => {
              setHasValue(e.target.value.length > 0); // ✅ FIX
              props.onChange && props.onChange(e);
            }}
            className={`w-full py-3 bg-transparent outline-none text-sm
              ${Icon ? "" : ""}
              `}
          />

          {/* PASSWORD TOGGLE */}
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 text-gray-400 hover:text-gray-600 transition"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}

          {/* SUCCESS ICON */}
          {!error && hasValue && !isPassword && (
            <CheckCircle2
              size={18}
              className="absolute right-3 text-green-500"
            />
          )}
        </div>

        {/* 🔥 FLOATING LABEL */}
        <label
          className={`absolute left-3 px-1 mt-0.5 text-xs transition-all duration-200 pointer-events-none
            ${
              isFocused || hasValue
                ? "-top-3 text-black bg-white"
                : "top-3 text-gray-400"
            }
          `}
        >
          {label}
        </label>

        {/* ERROR */}
        {error && (
          <p className="mt-1 text-xs text-red-500">
            {error}
          </p>
        )}
      </div>
    );
  }
);

export default Input;