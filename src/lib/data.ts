import { Image } from '../types/image';

// 初期画像データ
export const images: Image[] = [
  {
    id: '1',
    title: 'Gahag-0009010510',
    description: 'Beautiful artwork',
    url: 'https://res.cloudinary.com/demgahuqo/image/upload/v1747607089/gahag-0009010510-1_bpmzdj.png',
    tags: ['art', 'illustration'],
    createdAt: '2024-03-20T10:00:00Z',
    width: 1920,
    height: 1080,
    author: {
      id: '1',
      name: 'Artist',
      avatar: 'https://res.cloudinary.com/demgahuqo/image/upload/v1747607089/gahag-0009010510-1_bpmzdj.png'
    }
  }
];

// 画像を取得する関数
export async function getImages(): Promise<Image[]> {
  try {
    const response = await fetch('/api/images');
    if (!response.ok) {
      throw new Error('Failed to fetch images');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching images:', error);
    return images;
  }
}

// タグで画像をフィルタリング
export function getImagesByTag(tag: string): Image[] {
  return images.filter(image => image.tags.includes(tag));
}

// 検索クエリで画像をフィルタリング
export function searchImages(images: Image[], query: string): Image[] {
  const searchQuery = query.toLowerCase();
  return images.filter(image => 
    image.title.toLowerCase().includes(searchQuery) ||
    image.description.toLowerCase().includes(searchQuery) ||
    image.tags.some(tag => tag.toLowerCase().includes(searchQuery))
  );
}

export function getImageById(id: string): Image | undefined {
  return images.find(image => image.id === id);
} 