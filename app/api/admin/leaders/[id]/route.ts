import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/db';
import { uploadToCloudinary, deleteFromCloudinary } from '@/lib/imageUpload';

export const dynamic = 'force-dynamic';

// PUT update leader
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const leaderId = parseInt(id);
    if (isNaN(leaderId)) {
      return NextResponse.json({ error: 'Invalid leader ID' }, { status: 400 });
    }

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

    const existing = await prisma.leader.findUnique({ where: { id: leaderId } });
    if (!existing) return NextResponse.json({ error: 'Leader not found' }, { status: 404 });

    let imageUrl = existing.imageUrl ?? undefined;
    let imagePublicId = existing.imagePublicId ?? undefined;

    if (imageFile && imageFile.size > 0) {
      try {
        // Upload new image first
        const uploadResult = await uploadToCloudinary(imageFile, 'sount/leadership', 1200);
        
        // Delete old image if new upload succeeded
        if (existing.imagePublicId) {
          await deleteFromCloudinary(existing.imagePublicId);
        }

        imageUrl = uploadResult.secure_url;
        imagePublicId = uploadResult.public_id;
      } catch (uploadErr) {
        console.error('Cloudinary update error:', uploadErr);
        return NextResponse.json(
          { error: 'Image upload failed. Please try a different image.' },
          { status: 500 }
        );
      }
    }

    const categoryRaw = (formData.get('category') as string)?.trim();
    const allowedCategories = ['Trustee Board', 'Executive Committee', 'State Representative'];
    const category = categoryRaw && allowedCategories.includes(categoryRaw) ? categoryRaw : undefined;

    const leader = await prisma.leader.update({
      where: { id: leaderId },
      data: {
        name,
        title,
        ...(category ? { category } : {}),
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

    return NextResponse.json(leader);
  } catch (error) {
    console.error('Failed to update leader:', error);
    return NextResponse.json({ error: 'Failed to update leader' }, { status: 500 });
  }
}

// DELETE leader
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const leaderId = parseInt(id);
    if (isNaN(leaderId)) {
      return NextResponse.json({ error: 'Invalid leader ID' }, { status: 400 });
    }

    const existing = await prisma.leader.findUnique({ where: { id: leaderId } });
    if (existing?.imagePublicId) {
      await deleteFromCloudinary(existing.imagePublicId);
    }
    await prisma.leader.delete({ where: { id: leaderId } });

    revalidatePath('/');
    revalidatePath('/leadership');
    revalidatePath('/admin/dashboard/leadership');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete leader:', error);
    return NextResponse.json({ error: 'Failed to delete leader' }, { status: 500 });
  }
}
