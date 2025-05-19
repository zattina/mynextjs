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
    const result = await cloudinary.api.resource(params.id, {
      resource_type: 'image'
    });

    if (!result) {
      return NextResponse.json(
        { error: 'Image not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      id: result.public_id,
      title: result.original_filename,
      description: result.context?.description || '',
      url: result.secure_url,
      width: result.width,
      height: result.height,
      tags: result.tags || [],
      createdAt: result.created_at,
      author: {
        id: '1',
        name: result.context?.author || 'Unknown',
        avatar: result.secure_url
      }
    });
  } catch (error) {
    console.error('Error fetching image:', error);
    return NextResponse.json(
      { error: 'Failed to fetch image' },
      { status: 500 }
    );
  }
} 