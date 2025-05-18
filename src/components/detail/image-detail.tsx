import { Image } from '@/types/image';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';

interface ImageDetailProps {
  image: Image;
}

export function ImageDetail({ image }: ImageDetailProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
        <img
          src={image.url}
          alt={image.title}
          className="object-cover w-full h-full"
        />
      </div>
      
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {image.title}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {image.description}
          </p>
        </div>
        
        {image.author && (
          <div className="flex items-center space-x-4">
            <img
              src={image.author.avatar}
              alt={image.author.name}
              className="w-10 h-10 rounded-full"
            />
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
        
        <div className="space-y-2">
          <h3 className="font-medium text-gray-900 dark:text-white">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {image.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                #{tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 