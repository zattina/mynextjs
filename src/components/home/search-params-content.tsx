'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Image } from '@/types/image';
import { getImages, getImagesByTag, searchImages } from '@/lib/data';
import { ImageGrid } from '@/components/home/image-grid';
import { useEffect, useState } from 'react';

function SearchParamsInner() {
  const searchParams = useSearchParams();
  const tag = searchParams.get('tag');
  const query = searchParams.get('q');
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadImages() {
      setLoading(true);
      setError(null);
      try {
        console.log('Fetching images...');
        const allImages = await getImages();
        console.log('Fetched images:', allImages);
        
        let filteredImages = allImages;

        // タグでフィルタリング
        if (tag) {
          console.log('Filtering by tag:', tag);
          filteredImages = getImagesByTag(tag);
        }

        // 検索クエリでフィルタリング
        if (query) {
          console.log('Filtering by query:', query);
          filteredImages = searchImages(filteredImages, query);
        }

        console.log('Final filtered images:', filteredImages);
        setImages(filteredImages);
      } catch (error) {
        console.error('Error loading images:', error);
        setError('画像の読み込みに失敗しました');
      } finally {
        setLoading(false);
      }
    }

    loadImages();
  }, [tag, query]);

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
            {tag ? `#${tag}` : query ? `Search: ${query}` : 'All Images'}
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
          {tag ? `#${tag}` : query ? `Search: ${query}` : 'All Images'}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {images.length} 枚の画像が見つかりました
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