import Link from 'next/link';
import { themeIds } from '@/lib/themes';

export default function Index() {
  return (
    <main className="min-h-screen bg-stone-50 p-10 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-3">PMS Theme Preview</h1>
      <p className="text-stone-600 mb-6">
        Wizard'dan iframe ile gömülen önizleme uygulaması. Sahte tenant config + içerik ile
        tema render eder; ebeveyn pencereden{' '}
        <code className="bg-stone-200 px-1 rounded">postMessage</code> ile değişiklik kabul eder.
      </p>
      <h2 className="text-lg font-semibold mt-8 mb-2">Hazır temalar</h2>
      <ul className="space-y-2">
        {themeIds.map((id) => (
          <li key={id}>
            <Link
              href={`/preview?theme=${encodeURIComponent(id)}`}
              className="text-blue-700 hover:underline"
            >
              /preview?theme={id}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
