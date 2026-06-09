import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-900 dark:to-black text-gray-800 dark:text-gray-100 px-4 text-center">
      <h1 className="text-8xl font-extrabold mb-4 animate-bounce">404</h1>
      <h2 className="text-2xl font-semibold mb-6">Page Not Found</h2>
      <p className="mb-6 max-w-lg text-gray-600 dark:text-gray-400 leading-relaxed">
        We’re sorry, but the page you’re trying to access isn’t available right
        now. It may have been removed, renamed, or moved to a different section
        of the site.
      </p>
      <Link href={`/`}>
        <Button className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-500 transition-colors cursor-pointer">
          Back to Home
        </Button>
      </Link>
      <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
        You’ll find what you need on our homepage.
      </p>
    </div>
  );
}
