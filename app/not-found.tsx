export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white">
      <div className="text-center pixel-text">
        <h1 className="text-4xl mb-4 text-[#ff00ff]">404 - Page Not Found</h1>
        <p className="text-[#00ff00] mb-8">The page you're looking for doesn't exist or has been moved.</p>
        <a href="/" className="pixel-border-sm bg-[#00ff00] text-black px-6 py-2 hover:bg-[#00ff00]/80 transition-colors">
          Return Home
        </a>
      </div>
    </div>
  );
}
