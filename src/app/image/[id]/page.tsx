'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Sidebar } from '@/components/layout/sidebar';
import { ImageDetail } from '@/components/detail/image-detail';
import { toast } from 'sonner';
import { Image } from '@/types/image';

export default function ImageDetailPage() {
  const params = useParams();
  const [image, setImage] = useState<Image | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(`/api/images/${params.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch image');
        }
        const data = await response.json();
        setImage(data);
      } catch (error) {
        console.error('Error fetching image:', error);
        setError('画像の取得に失敗しました');
      } finally {
        setIsLoading(false);
      }
    };

    fetchImage();
  }, [params.id]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleTagsChange = async (newTags: string[]) => {
    if (!image) return;

    try {
      const response = await fetch(`/api/images/${image.id}/tags`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tags: newTags }),
      });

      if (!response.ok) {
        throw new Error('Failed to update tags');
      }

      setImage(prev => prev ? { ...prev, tags: newTags } : null);
      toast.success('タグを更新しました');
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating tags:', error);
      toast.error('タグの更新に失敗しました');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 pt-16 pl-64">
            <div className="container px-4 mx-auto">
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (error || !image) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 pt-16 pl-64">
            <div className="container px-4 mx-auto">
              <div className="text-center text-red-600">
                {error || '画像が見つかりませんでした'}
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 pt-16 pl-64">
          <div className="container px-4 mx-auto">
            <ImageDetail
              image={image}
              isEditing={isEditing}
              onEditToggle={handleEditToggle}
              onTagsChange={handleTagsChange}
            />
          </div>
        </main>
      </div>
    </div>
  );
} 