import { useState } from "react";

/**
 * ReplyOutput
 * -----------
 * Displays the AI-generated email reply with:
 * - Typing cursor animation
 * - Copy to clipboard button
 */

function ReplyOutput({ reply, isGenerating }) {
  const [copied, setCopied] = useState(false);

  if (!reply) return null;


  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(reply);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);

    } catch {
      setCopied(false);
    }
  };


  return (
    <div className="
      w-full
      rounded-xl
      border
      border-gray-200
      bg-white
      p-5
      shadow-sm
    ">

      <div className="
        flex
        items-center
        justify-between
        mb-3
      ">

        <h3 className="
          text-sm
          font-semibold
          text-gray-700
        ">
          Generated Reply
        </h3>


        <button
          type="button"
          onClick={handleCopy}
          className="
            text-xs
            font-medium
            rounded-lg
            px-3
            py-1.5
            bg-brand-50
            text-brand-700
            hover:bg-brand-100
            transition-colors
          "
        >
          {copied ? "Copied!" : "Copy to Clipboard"}
        </button>

      </div>



      <p className="
        whitespace-pre-wrap
        text-sm
        leading-relaxed
        text-gray-800
      ">
        {reply}

        {isGenerating && (
          <span className="
            inline-block
            ml-1
            animate-pulse
            text-gray-500
          ">
            |
          </span>
        )}

      </p>


    </div>
  );
}


export default ReplyOutput;