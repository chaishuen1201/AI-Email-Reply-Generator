// Available length options, kept in sync with the backend's Length enum.
const LENGTH_OPTIONS = ["Short", "Medium", "Long"];

/**
 * LengthSelector
 * --------------
 * Dropdown for selecting the desired length of the generated reply.
 *
 * Props:
 *   value    {string}   - Currently selected length.
 *   onChange {Function} - Callback fired with the new length on change.
 */
function LengthSelector({ value, onChange }) {
  return (
    <div className="w-full">
      <label htmlFor="length-select" className="block text-sm font-medium text-gray-700 mb-2">
        Length
      </label>
      <select
        id="length-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-gray-200 p-3 text-sm text-gray-800 shadow-sm
          bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500
          transition-colors duration-150"
      >
        {LENGTH_OPTIONS.map((length) => (
          <option key={length} value={length}>
            {length}
          </option>
        ))}
      </select>
    </div>
  );
}

export default LengthSelector;