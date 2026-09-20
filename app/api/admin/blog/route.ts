import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/db';
import { uploadToCloudinary } from '@/lib/imageUpload';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const posts = await prisma.blogPost.findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Failed to fetch blog posts:', error);
    return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
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
    if (!content) {
      return NextResponse.json({ error: 'Blog post content is required' }, { status: 400 });
    }

    // Generate slug from title
    const slug =
      title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim() +
      '-' +
      Date.now();

    let coverImageUrl: string | undefined;
    let coverImagePublicId: string | undefined;

    if (coverFile && coverFile.size > 0) {
      try {
        const uploadResult = await uploadToCloudinary(coverFile, 'sount/blog', 1600);
        coverImageUrl = uploadResult.secure_url;
        coverImagePublicId = uploadResult.public_id;
      } catch (uploadErr) {
        console.error('Cloudinary blog cover upload error:', uploadErr);
        return NextResponse.json(
          { error: 'Failed to upload blog cover image.' },
          { status: 500 }
        );
      }
    }

    const post = await prisma.blogPost.create({
      data: {
        title,
        slug,
        content,
        excerpt,
        author,
        isPublished,
        coverImageUrl,
        coverImagePublicId,
        publishedAt: isPublished ? new Date() : null,
      },
    });

    revalidatePath('/');
    revalidatePath('/blog');
    revalidatePath('/media/news');
    revalidatePath('/admin/dashboard/blog');

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error('Failed to create blog post:', error);
    return NextResponse.json({ error: 'Failed to create blog post' }, { status: 500 });
  }
}
