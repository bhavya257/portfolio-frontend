export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading page content"
      className="w-full flex-1 min-h-[50vh] flex flex-col items-center justify-center p-6"
    >
      <div className="relative flex items-center justify-center">
        <div className="h-10 w-10 rounded-full border-2 border-white/10 border-t-purple animate-spin" />
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}