import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/db';
import { uploadToCloudinary } from '@/lib/imageUpload';

export const dynamic = 'force-dynamic';

// GET all leaders
export async function GET() {
  try {
    const leaders = await prisma.leader.findMany({
      orderBy: { order: 'asc' },
    });
    return NextResponse.json(leaders);
  } catch (error) {
    console.error('Failed to fetch leaders:', error);
    return NextResponse.json({ error: 'Failed to fetch leaders' }, { status: 500 });
  }
}

// POST create leader
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const name = (formData.get('name') as string)?.trim();
    const title = (formData.get('title') as string)?.trim();
    const bio = (formData.get('bio') as string)?.trim() || null;
    const facebook = (formData.get('facebook') as string)?.trim() || null;
    const tiktok = (formData.get('tiktok') as string)?.trim() || null;
    const instagram = (formData.get('instagram') as string)?.trim() || null;
    const order = parseInt(formData.get('order') as string) || 0;
    const isActive = formData.get('isActive') !== 'false';
    const imageFile = formData.get('image') as File | null;

    if (!name) {
      return NextResponse.json({ error: 'Full name is required' }, { status: 400 });
    }
    if (!title) {
      return NextResponse.json({ error: 'Title/Position is required' }, { status: 400 });
    }

    let imageUrl: string | undefined;
    let imagePublicId: string | undefined;

    if (imageFile && imageFile.size > 0) {
      try {
        const uploadResult = await uploadToCloudinary(imageFile, 'sount/leadership', 1200);
        imageUrl = uploadResult.secure_url;
        imagePublicId = uploadResult.public_id;
      } catch (uploadErr) {
        console.error('Cloudinary upload error:', uploadErr);
        return NextResponse.json(
          { error: 'Image upload failed. Please try a different image or smaller file.' },
          { status: 500 }
        );
      }
    }

    const leader = await prisma.leader.create({
      data: {
        name,
        title,
        bio,
        facebook,
        tiktok,
        instagram,
        imageUrl,
        imagePublicId,
        order,
        isActive,
      },
    });

    revalidatePath('/');
    revalidatePath('/leadership');
    revalidatePath('/admin/dashboard/leadership');

    return NextResponse.json(leader, { status: 201 });
  } catch (error) {
    console.error('Failed to create leader:', error);
    return NextResponse.json({ error: 'Failed to create leader' }, { status: 500 });
  }
}
