import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import cloudinary from '@/lib/cloudinary';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const event = await prisma.event.findUnique({ where: { id: parseInt(id) } });
    if (!event) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(event);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch event' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const eventId = parseInt(id);
    const formData = await request.formData();

    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const location = formData.get('location') as string;
    const startDate = new Date(formData.get('startDate') as string);
    const endDate = new Date(formData.get('endDate') as string);
    const time = formData.get('time') as string;
    const isPublished = formData.get('isPublished') !== 'false';
    const coverFile = formData.get('cover') as File | null;

    const existing = await prisma.event.findUnique({ where: { id: eventId } });
    if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    let coverImageUrl = existing.coverImageUrl ?? undefined;
    let coverImagePublicId = existing.coverImagePublicId ?? undefined;

    if (coverFile && coverFile.size > 0) {
      if (existing.coverImagePublicId) {
        await cloudinary.uploader.destroy(existing.coverImagePublicId);
      }
      const bytes = await coverFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64 = buffer.toString('base64');
      const dataUri = `data:${coverFile.type};base64,${base64}`;
      const uploadResult = await cloudinary.uploader.upload(dataUri, {
        folder: 'sount/events',
      });
      coverImageUrl = uploadResult.secure_url;
      coverImagePublicId = uploadResult.public_id;
    }

    const event = await prisma.event.update({
      where: { id: eventId },
      data: {
        title,
        description,
        location,
        startDate,
        endDate,
        time,
        isPublished,
        coverImageUrl,
        coverImagePublicId,
      },
    });
    return NextResponse.json(event);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update event' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const eventId = parseInt(id);
    const existing = await prisma.event.findUnique({ where: { id: eventId } });
    if (existing?.coverImagePublicId) {
      await cloudinary.uploader.destroy(existing.coverImagePublicId);
    }
    await prisma.event.delete({ where: { id: eventId } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete event' }, { status: 500 });
  }
}
