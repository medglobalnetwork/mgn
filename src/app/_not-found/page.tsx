export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-black text-[#0B1B3D] mb-4">404</h1>
        <p className="text-lg text-gray-600 mb-6">The page you&apos;re looking for doesn&apos;t exist.</p>
        <a
          href="/"
          className="inline-block px-6 py-3 bg-[#0052CC] text-white font-semibold rounded-lg hover:bg-[#0043a4] transition-colors"
        >
          Go Home
        </a>
      </div>
    </div>
  );
}