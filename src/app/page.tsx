import Link from "next/link"

export default function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-300 text-gray-700 px-6 py-12">
      <div className="max-w-3xl w-full bg-white rounded-lg shadow-lg p-8">
          <h1>My Page</h1>
          <Link href="/faq" className="text-blue-500 hover:text-blue-700">
            Go to FAQ
          </Link>
      </div>
    </main>
  )
}