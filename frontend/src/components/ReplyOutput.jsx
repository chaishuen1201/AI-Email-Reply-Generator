import { useState } from "react";

/**
 * ReplyOutput
 * -----------
 * Displays the AI-generated email reply and provides a "Copy to Clipboard"
 * button with brief visual feedback once copied.
 *
 * Props:
 *   reply {string} - The generated reply text to display. If empty/null,
 *                     the component renders nothing.
 */
function ReplyOutput({ reply }) {
  const [copied, setCopied] = useState(false);

  if (!reply) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(reply);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="w-full rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-700">Generated Reply</h3>
        <button
          type="button"
          onClick={handleCopy}
          className="text-xs font-medium rounded-lg px-3 py-1.5 bg-brand-50 text-brand-700
            hover:bg-brand-100 transition-colors duration-150"
        >
          {copied ? "Copied!" : "Copy to Clipboard"}
        </button>
      </div>
      <p className="whitespace-pre-wrap text-sm leading-relaxed text-gray-800">{reply}</p>
    </div>
  );
}

export default ReplyOutput;