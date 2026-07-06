import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
      <div className="space-y-6">
        <h1 className="text-9xl font-extrabold text-blue-600 tracking-tight">404</h1>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Page not found</h2>
        <p className="text-gray-500 max-w-md mx-auto text-lg">
          Sorry, we couldn't find the page you're looking for. The link might be broken, or the page may have been removed.
        </p>
        <div className="flex justify-center gap-4 mt-8">
          <Link
            href="/"
            className="rounded-full bg-blue-600 px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all duration-300"
          >
            Go back home
          </Link>
          <Link
            href="/contactus"
            className="rounded-full bg-gray-100 px-8 py-3 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-200 transition-all duration-300"
          >
            Contact support
          </Link>
        </div>
      </div>
    </div>
  );
}
