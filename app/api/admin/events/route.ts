import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/db';
import { uploadToCloudinary } from '@/lib/imageUpload';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const events = await prisma.event.findMany({
      orderBy: { startDate: 'asc' },
    });
    return NextResponse.json(events);
  } catch (error) {
    console.error('Failed to fetch events:', error);
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
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
    if (!description) {
      return NextResponse.json({ error: 'Event description is required' }, { status: 400 });
    }
    if (!location) {
      return NextResponse.json({ error: 'Event location is required' }, { status: 400 });
    }

    let coverImageUrl: string | undefined;
    let coverImagePublicId: string | undefined;

    if (coverFile && coverFile.size > 0) {
      try {
        const uploadResult = await uploadToCloudinary(coverFile, 'sount/events', 1600);
        coverImageUrl = uploadResult.secure_url;
        coverImagePublicId = uploadResult.public_id;
      } catch (uploadErr) {
        console.error('Cloudinary event cover upload error:', uploadErr);
        return NextResponse.json(
          { error: 'Failed to upload event cover image.' },
          { status: 500 }
        );
      }
    }

    const event = await prisma.event.create({
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
    revalidatePath('/activity');
    revalidatePath('/admin/dashboard/events');

    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error('Failed to create event:', error);
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 });
  }
}
