import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import cloudinary from '@/lib/cloudinary';

export async function GET() {
  try {
    const partners = await prisma.partner.findMany({ orderBy: { order: 'asc' } });
    return NextResponse.json(partners);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch partners' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const website = formData.get('website') as string;
    const description = formData.get('description') as string;
    const order = parseInt(formData.get('order') as string) || 0;
    const logoFile = formData.get('logo') as File | null;

    let logoUrl: string | undefined;
    let logoPublicId: string | undefined;

    if (logoFile && logoFile.size > 0) {
      const bytes = await logoFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64 = buffer.toString('base64');
      const dataUri = `data:${logoFile.type};base64,${base64}`;
      const uploadResult = await cloudinary.uploader.upload(dataUri, {
        folder: 'sount/partners',
      });
      logoUrl = uploadResult.secure_url;
      logoPublicId = uploadResult.public_id;
    }

    const partner = await prisma.partner.create({
      data: { name, website, description, logoUrl, logoPublicId, order },
    });
    return NextResponse.json(partner, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create partner' }, { status: 500 });
  }
}
