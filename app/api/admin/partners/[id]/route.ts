import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import cloudinary from '@/lib/cloudinary';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const partnerId = parseInt(id);
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const website = formData.get('website') as string;
    const description = formData.get('description') as string;
    const order = parseInt(formData.get('order') as string) || 0;
    const isActive = formData.get('isActive') === 'true';
    const logoFile = formData.get('logo') as File | null;

    const existing = await prisma.partner.findUnique({ where: { id: partnerId } });
    if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    let logoUrl = existing.logoUrl ?? undefined;
    let logoPublicId = existing.logoPublicId ?? undefined;

    if (logoFile && logoFile.size > 0) {
      if (existing.logoPublicId) {
        await cloudinary.uploader.destroy(existing.logoPublicId);
      }
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

    const partner = await prisma.partner.update({
      where: { id: partnerId },
      data: { name, website, description, logoUrl, logoPublicId, order, isActive },
    });
    return NextResponse.json(partner);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update partner' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const partnerId = parseInt(id);
    const existing = await prisma.partner.findUnique({ where: { id: partnerId } });
    if (existing?.logoPublicId) {
      await cloudinary.uploader.destroy(existing.logoPublicId);
    }
    await prisma.partner.delete({ where: { id: partnerId } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete partner' }, { status: 500 });
  }
}
