"use client"

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { images, getImagesByTag } from '@/lib/data';
import { ImageGrid } from '@/components/home/image-grid';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function HomePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [filteredImages, setFilteredImages] = useState(images);
  const tag = searchParams.get('tag');
  
  useEffect(() => {
    if (tag) {
      setFilteredImages(getImagesByTag(tag));
    } else {
      setFilteredImages(images);
    }
  }, [tag]);
  
  const clearTag = () => {
    router.push('/');
  };
  
  return (
    <div className="container px-4 mx-auto">
      {tag && (
        <div className="mb-8 flex items-center">
          <Badge variant="outline" className="px-3 py-1 text-base">
            Showing images tagged with: #{tag}
          </Badge>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={clearTag} 
            className="ml-2"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
      
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {tag ? `#${tag} Images` : 'Explore Images'}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {tag 
            ? `Discover beautiful images tagged with #${tag}` 
            : 'Discover and explore stunning imagery from our community'}
        </p>
      </div>
      
      <ImageGrid images={filteredImages} />
    </div>
  );
} 