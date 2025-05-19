'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Image } from '@/types/image';
import { images, getImagesByTag } from '@/lib/data';
import { ImageGrid } from '@/components/home/image-grid';

function SearchParamsInner() {
  const searchParams = useSearchParams();
  const tag = searchParams.get('tag');

  const filteredImages: Image[] = tag ? getImagesByTag(tag) : images;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          {tag ? `#${tag}` : 'All Images'}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {filteredImages.length} images found
        </p>
      </div>
      <ImageGrid images={filteredImages} />
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