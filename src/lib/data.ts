import { Image } from '../types/image';
import { cloudinary } from './cloudinary';

// Cloudinaryから画像を取得する関数
async function fetchCloudinaryImages(): Promise<Image[]> {
  try {
    const result = await cloudinary.search
      .expression('folder:images/*')
      .sort_by('created_at', 'desc')
      .max_results(58)
      .execute();

    return result.resources.map((resource: any, index: number) => ({
      id: (index + 1).toString(),
      title: resource.public_id.split('/').pop() || `Image ${index + 1}`,
      description: 'Beautiful artwork from our collection',
      url: resource.secure_url,
      tags: ['art', 'illustration'],
      createdAt: resource.created_at,
      width: resource.width,
      height: resource.height,
      author: {
        id: '1',
        name: 'Artist',
        avatar: resource.secure_url
      }
    }));
  } catch (error) {
    console.error('Error fetching images from Cloudinary:', error);
    return [];
  }
}

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
  const cloudinaryImages = await fetchCloudinaryImages();
  return cloudinaryImages.length > 0 ? cloudinaryImages : images;
}

export function getImagesByTag(tag: string): Image[] {
  return images.filter(image => image.tags.includes(tag));
}

export function getImageById(id: string): Image | undefined {
  return images.find(image => image.id === id);
} 