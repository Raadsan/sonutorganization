import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import cloudinary from '@/lib/cloudinary';

// PUT update leader
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const leaderId = parseInt(id);
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const title = formData.get('title') as string;
    const bio = formData.get('bio') as string;
    const facebook = formData.get('facebook') as string || null;
    const tiktok = formData.get('tiktok') as string || null;
    const instagram = formData.get('instagram') as string || null;
    const order = parseInt(formData.get('order') as string) || 0;
    const isActive = formData.get('isActive') === 'true';
    const imageFile = formData.get('image') as File | null;

    const existing = await prisma.leader.findUnique({ where: { id: leaderId } });
    if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    let imageUrl = existing.imageUrl ?? undefined;
    let imagePublicId = existing.imagePublicId ?? undefined;

    if (imageFile && imageFile.size > 0) {
      // Delete old image from Cloudinary
      if (existing.imagePublicId) {
        await cloudinary.uploader.destroy(existing.imagePublicId);
      }
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

    const leader = await prisma.leader.update({
      where: { id: leaderId },
      data: { name, title, bio, facebook, tiktok, instagram, imageUrl, imagePublicId, order, isActive },
    });
    return NextResponse.json(leader);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to update leader' }, { status: 500 });
  }
}

// DELETE leader
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const leaderId = parseInt(id);
    const existing = await prisma.leader.findUnique({ where: { id: leaderId } });
    if (existing?.imagePublicId) {
      await cloudinary.uploader.destroy(existing.imagePublicId);
    }
    await prisma.leader.delete({ where: { id: leaderId } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete leader' }, { status: 500 });
  }
}
