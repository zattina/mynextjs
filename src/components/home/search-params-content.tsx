'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Image } from '@/types/image';
import { ImageGrid } from '@/components/home/image-grid';
import { useEffect, useState } from 'react';

interface ApiResponse {
  images: Image[];
  next_cursor?: string;
  total: number;
}

function SearchParamsInner() {
  const searchParams = useSearchParams();
  const tag = searchParams.get('tag');
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let isMounted = true;

    async function loadImages() {
      if (!isMounted) return;
      
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams();
        if (tag) params.append('tag', tag);
        
        const response = await fetch(`/api/images?${params.toString()}`);
        if (!response.ok) throw new Error('画像の取得に失敗しました');
        
        const data: ApiResponse = await response.json();
        if (!isMounted) return;

        setImages(data.images);
        setTotal(data.total);
      } catch (error) {
        if (!isMounted) return;
        setError('画像の読み込みに失敗しました');
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadImages();

    return () => {
      isMounted = false;
    };
  }, [tag]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            {tag ? `#${tag}` : 'All Images'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            画像が見つかりませんでした
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          {tag ? `#${tag}` : 'All Images'}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {total} 枚の画像が見つかりました
        </p>
      </div>
      <ImageGrid images={images} />
    </div>
  );
}

export function SearchParamsContent() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    }>
      <SearchParamsInner />
    </Suspense>
  );
} 