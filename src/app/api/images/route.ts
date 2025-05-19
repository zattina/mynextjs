import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME) {
  throw new Error('NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is not defined');
}

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET() {
  try {
    console.log('Fetching images from Cloudinary...');
    console.log('Cloud name:', process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);
    
    const result = await cloudinary.search
      .expression('resource_type:image')
      .sort_by('created_at', 'desc')
      .max_results(100)
      .execute();

    console.log('Cloudinary response:', result);

    if (!result.resources || result.resources.length === 0) {
      console.log('No images found in Cloudinary, returning fallback image');
      return NextResponse.json([{
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
      }]);
    }

    const images = result.resources.map((resource: any, index: number) => ({
      id: (index + 1).toString(),
      title: resource.public_id.split('/').pop()?.split('.')[0] || `Image ${index + 1}`,
      description: 'Beautiful artwork from our collection',
      url: resource.secure_url,
      tags: resource.tags || ['art', 'illustration'],
      createdAt: resource.created_at,
      width: resource.width,
      height: resource.height,
      author: {
        id: '1',
        name: 'Artist',
        avatar: resource.secure_url
      }
    }));

    console.log('Processed images:', images);
    return NextResponse.json(images);
  } catch (error) {
    console.error('Error fetching images from Cloudinary:', error);
    // エラー時はフォールバック画像を返す
    return NextResponse.json([{
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
    }]);
  }
} 