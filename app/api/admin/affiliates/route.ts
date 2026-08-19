import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';
import { prisma } from '@/lib/db';

const MAX_LOGO_SIZE = 5 * 1024 * 1024;

function parseOrder(value: FormDataEntryValue | null) {
  const order = Number.parseInt(String(value ?? '0'), 10);
  return Number.isFinite(order) ? order : 0;
}

function validateLogo(logo: FormDataEntryValue | null) {
  if (!(logo instanceof File) || logo.size === 0) {
    return 'An affiliate logo is required';
  }

  if (!logo.type.startsWith('image/')) {
    return 'The logo must be an image';
  }

  if (logo.size > MAX_LOGO_SIZE) {
    return 'The logo must be 5MB or smaller';
  }

  return null;
}

async function uploadLogo(logo: File) {
  const bytes = await logo.arrayBuffer();
  const dataUri = `data:${logo.type};base64,${Buffer.from(bytes).toString('base64')}`;

  return cloudinary.uploader.upload(dataUri, {
    folder: 'sount/affiliates',
    resource_type: 'image',
  });
}

export async function GET() {
  try {
    const affiliates = await prisma.affiliate.findMany({
      orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
    });

    return NextResponse.json(affiliates);
  } catch (error) {
    console.error('Failed to fetch affiliates:', error);
    return NextResponse.json({ error: 'Failed to fetch affiliates' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  let uploadedPublicId: string | null = null;

  try {
    const formData = await request.formData();
    const name = String(formData.get('name') ?? '').trim();
    const website = String(formData.get('website') ?? '').trim() || null;
    const description = String(formData.get('description') ?? '').trim() || null;
    const logo = formData.get('logo');

    if (!name) {
      return NextResponse.json({ error: 'Affiliate name is required' }, { status: 400 });
    }

    const logoError = validateLogo(logo);
    if (logoError) {
      return NextResponse.json({ error: logoError }, { status: 400 });
    }

    const uploadResult = await uploadLogo(logo as File);
    uploadedPublicId = uploadResult.public_id;

    const affiliate = await prisma.affiliate.create({
      data: {
        name,
        website,
        description,
        logoUrl: uploadResult.secure_url,
        logoPublicId: uploadResult.public_id,
        order: parseOrder(formData.get('order')),
        isActive: formData.get('isActive') !== 'false',
      },
    });

    revalidatePath('/about');
    return NextResponse.json(affiliate, { status: 201 });
  } catch (error) {
    if (uploadedPublicId) {
      await cloudinary.uploader.destroy(uploadedPublicId).catch(() => undefined);
    }

    console.error('Failed to create affiliate:', error);
    return NextResponse.json({ error: 'Failed to create affiliate' }, { status: 500 });
  }
}
