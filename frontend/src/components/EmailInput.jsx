/**
 * EmailInput
 * ----------
 * Large textarea where the user pastes the email they received and want
 * a reply drafted for.
 *
 * Props:
 *   value    {string}   - Current textarea value.
 *   onChange {Function} - Callback fired with the new value on change.
 *   error    {string}   - Optional validation error message to display.
 */
function EmailInput({ value, onChange, error }) {
  return (
    <div className="w-full">
      <label htmlFor="email-input" className="block text-sm font-medium text-gray-700 mb-2">
        Original Email
      </label>
      <textarea
        id="email-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste the received email here..."
        rows={10}
        className={`w-full resize-none rounded-xl border p-4 text-sm text-gray-800 shadow-sm
          focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500
          transition-colors duration-150
          ${error ? "border-red-400" : "border-gray-200"}
        `}
      />
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
}

export default EmailInput;