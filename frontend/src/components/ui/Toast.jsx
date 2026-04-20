import { useSelector, useDispatch } from "react-redux";
import { removeToast } from "../../features/toast/toastSlice";
import { useEffect } from "react";
import { CheckCircle, AlertCircle, Info } from "lucide-react";

export default function Toast() {
  const toasts = useSelector((state) => state.toast);
  const dispatch = useDispatch();

  useEffect(() => {
    const timers = toasts.map((toast) =>
      setTimeout(() => {
        dispatch(removeToast(toast.id));
      }, 3000)
    );

    return () => timers.forEach(clearTimeout);
  }, [toasts, dispatch]);

  const getIcon = (type) => {
    switch (type) {
      case "success":
        return <CheckCircle size={18} />;
      case "error":
        return <AlertCircle size={18} />;
      default:
        return <Info size={18} />;
    }
  };

  const getColor = (type) => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-200 text-green-700";
      case "error":
        return "bg-red-50 border-red-200 text-red-700";
      default:
        return "bg-blue-50 border-blue-200 text-blue-700";
    }
  };

  return (
    <div className="fixed top-5 right-5 flex flex-col gap-3 z-50">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-center gap-2 px-4 py-3 rounded-lg border shadow-md min-w-[250px] animate-slideIn ${getColor(
            toast.type
          )}`}
        >
          {getIcon(toast.type)}
          <span className="text-sm font-medium">{toast.message}</span>
        </div>
      ))}
    </div>
  );
}