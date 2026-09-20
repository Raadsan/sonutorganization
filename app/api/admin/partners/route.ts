import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/db';
import { uploadToCloudinary } from '@/lib/imageUpload';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const partners = await prisma.partner.findMany({ orderBy: { order: 'asc' } });
    return NextResponse.json(partners);
  } catch (error) {
    console.error('Failed to fetch partners:', error);
    return NextResponse.json({ error: 'Failed to fetch partners' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const name = (formData.get('name') as string)?.trim();
    const website = (formData.get('website') as string)?.trim() || null;
    const description = (formData.get('description') as string)?.trim() || null;
    const order = parseInt(formData.get('order') as string) || 0;
    const isActive = formData.get('isActive') !== 'false';
    const logoFile = formData.get('logo') as File | null;

    if (!name) {
      return NextResponse.json({ error: 'Partner name is required' }, { status: 400 });
    }

    let logoUrl: string | undefined;
    let logoPublicId: string | undefined;

    if (logoFile && logoFile.size > 0) {
      try {
        const uploadResult = await uploadToCloudinary(logoFile, 'sount/partners', 800);
        logoUrl = uploadResult.secure_url;
        logoPublicId = uploadResult.public_id;
      } catch (uploadErr) {
        console.error('Cloudinary partner logo upload error:', uploadErr);
        return NextResponse.json(
          { error: 'Failed to upload partner logo image.' },
          { status: 500 }
        );
      }
    }

    const partner = await prisma.partner.create({
      data: { name, website, description, logoUrl, logoPublicId, order, isActive },
    });

    revalidatePath('/');
    revalidatePath('/about');
    revalidatePath('/admin/dashboard/partners');

    return NextResponse.json(partner, { status: 201 });
  } catch (error) {
    console.error('Failed to create partner:', error);
    return NextResponse.json({ error: 'Failed to create partner' }, { status: 500 });
  }
}
