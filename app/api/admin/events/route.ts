import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import cloudinary from '@/lib/cloudinary';

export async function GET() {
  try {
    const events = await prisma.event.findMany({
      orderBy: { startDate: 'asc' },
    });
    return NextResponse.json(events);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const location = formData.get('location') as string;
    const startDate = new Date(formData.get('startDate') as string);
    const endDate = new Date(formData.get('endDate') as string);
    const time = formData.get('time') as string;
    const isPublished = formData.get('isPublished') !== 'false';
    const coverFile = formData.get('cover') as File | null;

    let coverImageUrl: string | undefined;
    let coverImagePublicId: string | undefined;

    if (coverFile && coverFile.size > 0) {
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
    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 });
  }
}
