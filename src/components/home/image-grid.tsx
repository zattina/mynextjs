'use client';

import type { Image as ImageType } from '@/types/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import NextImage from 'next/image';

interface ImageGridProps {
  images: ImageType[] | { images: ImageType[] };
}

export function ImageGrid({ images }: ImageGridProps) {
  // APIレスポンスの形式に応じて画像配列を取得
  const imageArray = Array.isArray(images) ? images : images.images;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {imageArray.map((image) => (
        <Link 
          key={image.id}
          href={`/image/${image.id}`}
          className="block"
        >
          <Card className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
            <div className="aspect-[4/3] relative">
              <NextImage
                src={image.url}
                alt={image.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
                priority
              />
            </div>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold mb-2">{image.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                {image.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {image.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
} 