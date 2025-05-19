'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ImageDetail } from '@/components/detail/image-detail';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Image } from '@/types/image';
import { Header } from '@/components/layout/header';
import { Sidebar } from '@/components/layout/sidebar';

export default function ImageDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [image, setImage] = useState<Image | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    let isMounted = true;

    const fetchImage = async () => {
      try {
        const response = await fetch(`/api/images/${params.id}`);
        if (!isMounted) return;

        if (!response.ok) {
          if (response.status === 404) {
            setError('画像が見つかりませんでした');
          } else {
            throw new Error('画像の取得に失敗しました');
          }
          return;
        }

        const foundImage = await response.json();
        if (!isMounted) return;
        
        setImage(foundImage);
        document.title = `${foundImage.title} | PixelGram`;
      } catch (err) {
        if (!isMounted) return;
        setError(err instanceof Error ? err.message : 'エラーが発生しました');
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchImage();
    
    return () => {
      isMounted = false;
      document.title = 'PixelGram';
    };
  }, [params.id]);
  
  if (loading) {
    return (
      <>
        <Header />
        <Sidebar />
        <main className="pt-16 pl-64">
          <div className="container px-4 mx-auto">
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          </div>
        </main>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <Sidebar />
        <main className="pt-16 pl-64">
          <div className="container px-4 mx-auto">
            <div className="text-center">
              <p className="text-red-600 mb-4">{error}</p>
              <Button 
                variant="outline"
                onClick={() => router.push('/')}
              >
                トップページに戻る
              </Button>
            </div>
          </div>
        </main>
      </>
    );
  }
  
  if (!image) {
    return null;
  }
  
  return (
    <>
      <Header />
      <Sidebar />
      <main className="pt-16 pl-64">
        <div className="container px-4 mx-auto">
          <div className="mb-6">
            <Button 
              variant="ghost"
              size="sm"
              className="flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
              onClick={() => router.push('/')}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              トップページに戻る
            </Button>
          </div>
          
          <ImageDetail image={image} />
        </div>
      </main>
    </>
  );
} 