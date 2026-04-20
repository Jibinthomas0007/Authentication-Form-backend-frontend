export default function FormWrapper({ title, onSubmit, children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={onSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-xl font-bold mb-4 text-center">{title}</h2>
        {children}
      </form>
    </div>
  );
}