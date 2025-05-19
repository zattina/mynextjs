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

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const tag = searchParams.get('tag');
    const query = searchParams.get('q');
    const nextCursor = searchParams.get('next_cursor') || undefined;

    let expression = 'resource_type:image';
    if (tag) {
      expression += ` AND tags:${tag}`;
    }
    if (query) {
      const escapedQuery = query.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      expression += ` AND public_id=*${escapedQuery}*`;
    }

    console.log('Search expression:', expression);

    const result = await cloudinary.search
      .expression(expression)
      .sort_by('created_at', 'desc')
      .max_results(limit)
      .next_cursor(page > 1 ? nextCursor : undefined)
      .execute();

    console.log('Search results:', result);

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

    return NextResponse.json({
      images,
      next_cursor: result.next_cursor,
      total: result.total_count
    });
  } catch (error) {
    console.error('Error fetching images:', error);
    return NextResponse.json(
      { error: 'Failed to fetch images' },
      { status: 500 }
    );
  }
} 