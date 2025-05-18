'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ImageDetail } from '@/components/detail/image-detail';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Image } from '@/types/image';

export default function ImageDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [image, setImage] = useState<Image | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch('/api/images');
        if (!response.ok) {
          throw new Error('Failed to fetch images');
        }
        const images = await response.json();
        const foundImage = images.find((img: Image) => img.id === params.id);
        
        if (!foundImage) {
          router.push('/');
          return;
        }
        
        setImage(foundImage);
        document.title = `${foundImage.title} | PixelGram`;
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
    
    return () => {
      document.title = 'PixelGram';
    };
  }, [params.id, router]);
  
  if (loading) {
    return (
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container px-4 mx-auto">
        <div className="text-center text-red-600">
          <p>Error: {error}</p>
        </div>
      </div>
    );
  }
  
  if (!image) {
    return null;
  }
  
  return (
    <div className="container px-4 mx-auto">
      <div className="mb-6">
        <Button 
          variant="ghost"
          size="sm"
          className="flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
          onClick={() => router.back()}
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
      </div>
      
      <ImageDetail image={image} />
    </div>
  );
} 