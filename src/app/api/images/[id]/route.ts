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

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    if (!params.id) {
      return NextResponse.json(
        { error: 'Image ID is required' },
        { status: 400 }
      );
    }

    const result = await cloudinary.search
      .expression(`public_id:${params.id}`)
      .execute();

    if (!result.resources.length) {
      return NextResponse.json(
        { error: 'Image not found' },
        { status: 404 }
      );
    }

    const resource = result.resources[0];
    const image = {
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
    };

    return NextResponse.json(image);
  } catch (error) {
    console.error('Error fetching image:', error);
    return NextResponse.json(
      { error: 'Failed to fetch image' },
      { status: 500 }
    );
  }
} 