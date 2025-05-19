import { Image } from '@/types/image';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import NextImage from 'next/image';
import { TagEditor } from '@/components/image/tag-editor';

interface ImageDetailProps {
  image: Image;
  isEditing: boolean;
  onEditToggle: () => void;
  onTagsChange: (newTags: string[]) => void;
}

export function ImageDetail({ image, isEditing, onEditToggle, onTagsChange }: ImageDetailProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
        <NextImage
          src={image.url}
          alt={image.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          priority
        />
      </div>
      
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {image.title}
          </h1>
        </div>
        
        {image.author && (
          <div className="flex items-center space-x-4">
            <div className="relative w-10 h-10">
              <NextImage
                src={image.author.avatar}
                alt={image.author.name}
                fill
                className="rounded-full object-cover"
              />
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                {image.author.name}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {formatDistanceToNow(new Date(image.createdAt), { addSuffix: true })}
              </p>
            </div>
          </div>
        )}
        
        <div className="space-y-4">
          <h3 className="font-medium text-gray-900 dark:text-white">Tags</h3>
          <TagEditor
            tags={image.tags}
            onTagsChange={onTagsChange}
            isEditing={isEditing}
            onEditToggle={onEditToggle}
          />
        </div>
      </div>
    </div>
  );
} 