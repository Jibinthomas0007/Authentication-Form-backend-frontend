export const getErrorMessage = (error) => {
  if (!error) return "Something went wrong. Please try again.";

  // 🔥 Laravel validation errors
  if (error.errors) {
    const firstError = Object.values(error.errors)[0];
    return firstError[0];
  }

  // 🔥 Axios network error
  if (error === "Network Error") {
    return "Unable to connect. Please check your internet.";
  }

  // 🔥 Backend messages
  if (error.message) {
    switch (error.message) {
      case "Invalid credentials":
        return "Incorrect email/phone or password";

      case "Unauthorized":
        return "Session expired. Please login again.";

      case "Database error. Please try again later.":
        return "Server is temporarily unavailable.";

      default:
        return error.message;
    }
  }

  return "Something went wrong. Please try again.";
};