// Available tone options, kept in sync with the backend's Tone enum.
const TONE_OPTIONS = ["Professional", "Friendly", "Formal", "Casual", "Empathetic"];

/**
 * ToneSelector
 * ------------
 * Dropdown for selecting the desired tone of the generated reply.
 *
 * Props:
 *   value    {string}   - Currently selected tone.
 *   onChange {Function} - Callback fired with the new tone on change.
 */
function ToneSelector({ value, onChange }) {
  return (
    <div className="w-full">
      <label htmlFor="tone-select" className="block text-sm font-medium text-gray-700 mb-2">
        Tone
      </label>
      <select
        id="tone-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-gray-200 p-3 text-sm text-gray-800 shadow-sm
          bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500
          transition-colors duration-150"
      >
        {TONE_OPTIONS.map((tone) => (
          <option key={tone} value={tone}>
            {tone}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ToneSelector;