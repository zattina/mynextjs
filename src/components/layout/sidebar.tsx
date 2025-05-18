'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Home,
  Tags,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

const popularTags = [
  'nature',
  'architecture',
  'travel',
  'landscape',
  'city',
  'wildlife',
  'portrait',
  'street',
  'macro',
  'abstract',
  'black-and-white',
  'night',
  'water',
  'food',
  'sports'
];

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTag = searchParams.get('tag');

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleTagClick = (tag: string) => {
    router.push(`/?tag=${tag}`);
  };

  return (
    <div
      className={`
        fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800
        transition-all duration-300 ease-in-out z-40
        ${isCollapsed ? 'w-16' : 'w-64'}
      `}
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between p-4">
          <h2 className={`font-semibold ${isCollapsed ? 'hidden' : 'block'}`}>
            Navigation
          </h2>
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto"
            onClick={toggleSidebar}
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>

        <Separator />

        <ScrollArea className="flex-1 px-3">
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Button
                variant="ghost"
                className={`w-full justify-start ${isCollapsed ? 'px-2' : 'px-4'}`}
                onClick={() => router.push('/')}
              >
                <Home className={`h-5 w-5 ${isCollapsed ? 'mx-auto' : 'mr-2'}`} />
                {!isCollapsed && <span>Home</span>}
              </Button>
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex items-center">
                <Tags className={`h-5 w-5 ${isCollapsed ? 'mx-auto' : 'mr-2'}`} />
                {!isCollapsed && <span className="text-sm font-medium">Popular Tags</span>}
              </div>
              {!isCollapsed && (
                <div className="grid grid-cols-2 gap-2">
                  {popularTags.map((tag) => (
                    <Badge
                      key={tag}
                      variant={currentTag === tag ? "default" : "secondary"}
                      className="cursor-pointer truncate"
                      onClick={() => handleTagClick(tag)}
                    >
                      #{tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
} 