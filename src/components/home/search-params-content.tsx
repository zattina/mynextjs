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

  useEffect(() => {
    async function loadImages() {
      setLoading(true);
      try {
        const allImages = await getImages();
        let filteredImages = allImages;

        // タグでフィルタリング
        if (tag) {
          filteredImages = getImagesByTag(tag);
        }

        // 検索クエリでフィルタリング
        if (query) {
          filteredImages = searchImages(filteredImages, query);
        }

        setImages(filteredImages);
      } catch (error) {
        console.error('Error loading images:', error);
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          {tag ? `#${tag}` : query ? `Search: ${query}` : 'All Images'}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {images.length} images found
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