import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import cloudinary from '@/lib/cloudinary';

// GET all leaders
export async function GET() {
  try {
    const leaders = await prisma.leader.findMany({ orderBy: { order: 'asc' } });
    return NextResponse.json(leaders);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch leaders' }, { status: 500 });
  }
}

// POST create leader
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const title = formData.get('title') as string;
    const bio = formData.get('bio') as string;
    const facebook = formData.get('facebook') as string || null;
    const tiktok = formData.get('tiktok') as string || null;
    const instagram = formData.get('instagram') as string || null;
    const order = parseInt(formData.get('order') as string) || 0;
    const imageFile = formData.get('image') as File | null;

    let imageUrl: string | undefined;
    let imagePublicId: string | undefined;

    if (imageFile && imageFile.size > 0) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64 = buffer.toString('base64');
      const dataUri = `data:${imageFile.type};base64,${base64}`;
      const uploadResult = await cloudinary.uploader.upload(dataUri, {
        folder: 'sount/leadership',
      });
      imageUrl = uploadResult.secure_url;
      imagePublicId = uploadResult.public_id;
    }

    const leader = await prisma.leader.create({
      data: { name, title, bio, facebook, tiktok, instagram, imageUrl, imagePublicId, order },
    });
    return NextResponse.json(leader, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create leader' }, { status: 500 });
  }
}
