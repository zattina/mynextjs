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

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { tags } = await request.json();
    
    if (!Array.isArray(tags)) {
      return NextResponse.json(
        { error: 'Tags must be an array' },
        { status: 400 }
      );
    }

    // 既存のタグを取得
    const resource = await cloudinary.api.resource(params.id);
    const existingTags = resource.tags || [];

    // 新しいタグを追加
    const newTags = tags.filter((tag: string) => !existingTags.includes(tag));
    if (newTags.length > 0) {
      await cloudinary.uploader.add_tag(newTags.join(','), [params.id]);
    }

    // 削除されたタグを処理
    const removedTags = existingTags.filter((tag: string) => !tags.includes(tag));
    if (removedTags.length > 0) {
      await cloudinary.uploader.remove_tag(removedTags.join(','), [params.id]);
    }

    return NextResponse.json({
      success: true,
      tags: tags
    });
  } catch (error) {
    console.error('Error updating tags:', error);
    return NextResponse.json(
      { error: 'Failed to update tags' },
      { status: 500 }
    );
  }
} 