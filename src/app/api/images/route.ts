import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET() {
  try {
    const result = await cloudinary.search
      .expression('resource_type:image')
      .sort_by('created_at', 'desc')
      .max_results(100)
      .execute();

    const images = result.resources.map((resource: any) => ({
      id: resource.public_id,
      title: resource.public_id.split('/').pop()?.split('.')[0] || resource.public_id,
      description: resource.public_id,
      url: resource.secure_url,
      tags: resource.tags || [],
      createdAt: resource.created_at,
      width: resource.width,
      height: resource.height,
      author: {
        id: '1',
        name: 'Artist',
        avatar: resource.secure_url
      }
    }));

    return NextResponse.json(images);
  } catch (error) {
    console.error('Error fetching images:', error);
    return NextResponse.json(
      { error: 'Failed to fetch images' },
      { status: 500 }
    );
  }
} 