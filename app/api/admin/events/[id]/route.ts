import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/db';
import { uploadToCloudinary, deleteFromCloudinary } from '@/lib/imageUpload';

export const dynamic = 'force-dynamic';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const event = await prisma.event.findUnique({ where: { id: parseInt(id) } });
    if (!event) return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    return NextResponse.json(event);
  } catch (error) {
    console.error('Failed to fetch event:', error);
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
    if (isNaN(eventId)) {
      return NextResponse.json({ error: 'Invalid event ID' }, { status: 400 });
    }

    const formData = await request.formData();
    const title = (formData.get('title') as string)?.trim();
    const description = (formData.get('description') as string)?.trim();
    const location = (formData.get('location') as string)?.trim();
    const startDate = new Date(formData.get('startDate') as string);
    const endDate = new Date(formData.get('endDate') as string);
    const time = (formData.get('time') as string)?.trim();
    const isPublished = formData.get('isPublished') !== 'false';
    const coverFile = formData.get('cover') as File | null;

    if (!title) {
      return NextResponse.json({ error: 'Event title is required' }, { status: 400 });
    }

    const existing = await prisma.event.findUnique({ where: { id: eventId } });
    if (!existing) return NextResponse.json({ error: 'Event not found' }, { status: 404 });

    let coverImageUrl = existing.coverImageUrl ?? undefined;
    let coverImagePublicId = existing.coverImagePublicId ?? undefined;

    if (coverFile && coverFile.size > 0) {
      try {
        const uploadResult = await uploadToCloudinary(coverFile, 'sount/events', 1600);
        if (existing.coverImagePublicId) {
          await deleteFromCloudinary(existing.coverImagePublicId);
        }
        coverImageUrl = uploadResult.secure_url;
        coverImagePublicId = uploadResult.public_id;
      } catch (uploadErr) {
        console.error('Cloudinary event cover update error:', uploadErr);
        return NextResponse.json(
          { error: 'Failed to upload event cover image.' },
          { status: 500 }
        );
      }
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

    revalidatePath('/');
    revalidatePath('/media/news');
    revalidatePath('/media/events');
    revalidatePath('/Resources/events');
    revalidatePath('/activity');
    revalidatePath('/admin/dashboard/events');

    return NextResponse.json(event);
  } catch (error) {
    console.error('Failed to update event:', error);
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
    if (isNaN(eventId)) {
      return NextResponse.json({ error: 'Invalid event ID' }, { status: 400 });
    }

    const existing = await prisma.event.findUnique({ where: { id: eventId } });
    if (existing?.coverImagePublicId) {
      await deleteFromCloudinary(existing.coverImagePublicId);
    }
    await prisma.event.delete({ where: { id: eventId } });

    revalidatePath('/');
    revalidatePath('/media/news');
    revalidatePath('/media/events');
    revalidatePath('/Resources/events');
    revalidatePath('/activity');
    revalidatePath('/admin/dashboard/events');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete event:', error);
    return NextResponse.json({ error: 'Failed to delete event' }, { status: 500 });
  }
}
