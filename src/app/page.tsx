import { Suspense } from 'react';
import { Header } from '@/components/layout/header';
import { Sidebar } from '@/components/layout/sidebar';
import { SearchParamsContent } from '@/components/home/search-params-content';

export default function Home() {
  return (
    <>
      <Header />
      <Sidebar />
      <main className="pt-16 pl-64">
        <Suspense fallback={
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        }>
          <SearchParamsContent />
        </Suspense>
      </main>
    </>
  );
}
