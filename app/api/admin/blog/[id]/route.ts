import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/db';
import { uploadToCloudinary, deleteFromCloudinary } from '@/lib/imageUpload';

export const dynamic = 'force-dynamic';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const postId = parseInt(id);
    if (isNaN(postId)) {
      return NextResponse.json({ error: 'Invalid post ID' }, { status: 400 });
    }

    const formData = await request.formData();
    const title = (formData.get('title') as string)?.trim();
    const content = (formData.get('content') as string)?.trim();
    const excerpt = (formData.get('excerpt') as string)?.trim() || null;
    const author = (formData.get('author') as string)?.trim() || 'Admin';
    const isPublished = formData.get('isPublished') === 'true';
    const coverFile = formData.get('cover') as File | null;

    if (!title) {
      return NextResponse.json({ error: 'Blog post title is required' }, { status: 400 });
    }

    const existing = await prisma.blogPost.findUnique({ where: { id: postId } });
    if (!existing) return NextResponse.json({ error: 'Post not found' }, { status: 404 });

    let coverImageUrl = existing.coverImageUrl ?? undefined;
    let coverImagePublicId = existing.coverImagePublicId ?? undefined;

    if (coverFile && coverFile.size > 0) {
      try {
        const uploadResult = await uploadToCloudinary(coverFile, 'sount/blog', 1600);
        if (existing.coverImagePublicId) {
          await deleteFromCloudinary(existing.coverImagePublicId);
        }
        coverImageUrl = uploadResult.secure_url;
        coverImagePublicId = uploadResult.public_id;
      } catch (uploadErr) {
        console.error('Cloudinary blog cover update error:', uploadErr);
        return NextResponse.json(
          { error: 'Failed to upload blog cover image.' },
          { status: 500 }
        );
      }
    }

    const post = await prisma.blogPost.update({
      where: { id: postId },
      data: {
        title,
        content: content || existing.content,
        excerpt,
        author,
        isPublished,
        coverImageUrl,
        coverImagePublicId,
        publishedAt: isPublished && !existing.publishedAt ? new Date() : existing.publishedAt,
      },
    });

    revalidatePath('/');
    revalidatePath('/blog');
    revalidatePath('/media/news');
    revalidatePath('/admin/dashboard/blog');

    return NextResponse.json(post);
  } catch (error) {
    console.error('Failed to update blog post:', error);
    return NextResponse.json({ error: 'Failed to update blog post' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const postId = parseInt(id);
    if (isNaN(postId)) {
      return NextResponse.json({ error: 'Invalid post ID' }, { status: 400 });
    }

    const existing = await prisma.blogPost.findUnique({ where: { id: postId } });
    if (existing?.coverImagePublicId) {
      await deleteFromCloudinary(existing.coverImagePublicId);
    }
    await prisma.blogPost.delete({ where: { id: postId } });

    revalidatePath('/');
    revalidatePath('/blog');
    revalidatePath('/media/news');
    revalidatePath('/admin/dashboard/blog');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete blog post:', error);
    return NextResponse.json({ error: 'Failed to delete blog post' }, { status: 500 });
  }
}
