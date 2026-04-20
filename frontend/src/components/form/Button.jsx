export default function Button({
  children,
  loading = false,
  disabled = false,
  type = "submit",
  loadingText = "Processing...",
  className = "",
}) {
  const isDisabled = loading || disabled;

  return (
    <button
      type={type}
      disabled={isDisabled}
      className={`w-full py-2 rounded-lg flex items-center justify-center gap-2
        ${isDisabled
          ? "bg-blue-400 cursor-not-allowed"
          : "bg-blue-600 hover:bg-blue-700 cursor-pointer"}
        text-white transition ${className}`}
    >
      {/* 🔄 Spinner */}
      {loading && (
        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
      )}

      {/* 🔥 Dynamic text */}
      {loading ? loadingText : children}
    </button>
  );
}