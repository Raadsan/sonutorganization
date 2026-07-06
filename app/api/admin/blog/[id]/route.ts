import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import cloudinary from '@/lib/cloudinary';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const postId = parseInt(id);
    const formData = await request.formData();
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const excerpt = formData.get('excerpt') as string;
    const author = (formData.get('author') as string) || 'Admin';
    const isPublished = formData.get('isPublished') === 'true';
    const coverFile = formData.get('cover') as File | null;

    const existing = await prisma.blogPost.findUnique({ where: { id: postId } });
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
        folder: 'sount/blog',
      });
      coverImageUrl = uploadResult.secure_url;
      coverImagePublicId = uploadResult.public_id;
    }

    const post = await prisma.blogPost.update({
      where: { id: postId },
      data: {
        title,
        content,
        excerpt,
        author,
        isPublished,
        coverImageUrl,
        coverImagePublicId,
        publishedAt: isPublished && !existing.publishedAt ? new Date() : existing.publishedAt,
      },
    });
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update blog post' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const postId = parseInt(id);
    const existing = await prisma.blogPost.findUnique({ where: { id: postId } });
    if (existing?.coverImagePublicId) {
      await cloudinary.uploader.destroy(existing.coverImagePublicId);
    }
    await prisma.blogPost.delete({ where: { id: postId } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete blog post' }, { status: 500 });
  }
}
