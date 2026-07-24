export default function GenerateButton({ onClick, isLoading }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isLoading}
      className="
        w-full
        mt-4
        py-3
        rounded-lg
        bg-[#242424]
        text-white
        font-medium
        text-sm
        tracking-wide
        transition-all
        duration-200
        hover:bg-[#3a3a3a]
        disabled:opacity-50
        disabled:cursor-not-allowed
      "
    >
      {isLoading ? "Drafting..." : "Draft Email →"}
    </button>
  );
}