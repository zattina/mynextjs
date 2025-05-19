'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { ImageGrid } from '@/components/home/image-grid';
import { Image } from '@/types/image';

export function HomeContent() {
  const searchParams = useSearchParams();
  const tag = searchParams.get('tag');
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('/api/images');
        if (!response.ok) {
          throw new Error('Failed to fetch images');
        }
        const data = await response.json();
        setImages(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const filteredImages = tag
    ? images.filter((image) => image.tags.includes(tag))
    : images;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600">
        <p>Error: {error}</p>
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
          {filteredImages.length} images found
        </p>
      </div>
      <ImageGrid images={filteredImages} />
    </div>
  );
} 