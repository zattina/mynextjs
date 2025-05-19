import { Header } from '@/components/layout/header';
import { Sidebar } from '@/components/layout/sidebar';
import { HomeContent } from '@/components/home/home-content';

export default function Home() {
  return (
    <>
      <Header />
      <Sidebar />
      <main className="pt-16 pl-64">
        <HomeContent />
      </main>
    </>
  );
}
