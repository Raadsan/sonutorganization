import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/db';
import { uploadToCloudinary, deleteFromCloudinary } from '@/lib/imageUpload';

export const dynamic = 'force-dynamic';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const partnerId = parseInt(id);
    if (isNaN(partnerId)) {
      return NextResponse.json({ error: 'Invalid partner ID' }, { status: 400 });
    }

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

    const existing = await prisma.partner.findUnique({ where: { id: partnerId } });
    if (!existing) return NextResponse.json({ error: 'Partner not found' }, { status: 404 });

    let logoUrl = existing.logoUrl ?? undefined;
    let logoPublicId = existing.logoPublicId ?? undefined;

    if (logoFile && logoFile.size > 0) {
      try {
        const uploadResult = await uploadToCloudinary(logoFile, 'sount/partners', 800);
        if (existing.logoPublicId) {
          await deleteFromCloudinary(existing.logoPublicId);
        }
        logoUrl = uploadResult.secure_url;
        logoPublicId = uploadResult.public_id;
      } catch (uploadErr) {
        console.error('Cloudinary partner update error:', uploadErr);
        return NextResponse.json(
          { error: 'Failed to upload partner logo image.' },
          { status: 500 }
        );
      }
    }

    const partner = await prisma.partner.update({
      where: { id: partnerId },
      data: { name, website, description, logoUrl, logoPublicId, order, isActive },
    });

    revalidatePath('/');
    revalidatePath('/about');
    revalidatePath('/admin/dashboard/partners');

    return NextResponse.json(partner);
  } catch (error) {
    console.error('Failed to update partner:', error);
    return NextResponse.json({ error: 'Failed to update partner' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const partnerId = parseInt(id);
    if (isNaN(partnerId)) {
      return NextResponse.json({ error: 'Invalid partner ID' }, { status: 400 });
    }

    const existing = await prisma.partner.findUnique({ where: { id: partnerId } });
    if (existing?.logoPublicId) {
      await deleteFromCloudinary(existing.logoPublicId);
    }
    await prisma.partner.delete({ where: { id: partnerId } });

    revalidatePath('/');
    revalidatePath('/about');
    revalidatePath('/admin/dashboard/partners');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete partner:', error);
    return NextResponse.json({ error: 'Failed to delete partner' }, { status: 500 });
  }
}
