'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white">
      <div className="text-center pixel-text">
        <h1 className="text-4xl mb-4 text-[#ff0000]">Something went wrong!</h1>
        <p className="text-[#00ff00] mb-8">We encountered an error while processing your request.</p>
        <button
          onClick={() => reset()}
          className="pixel-border-sm bg-[#00ff00] text-black px-6 py-2 hover:bg-[#00ff00]/80 transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
