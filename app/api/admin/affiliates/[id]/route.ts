import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';
import { prisma } from '@/lib/db';

const MAX_LOGO_SIZE = 5 * 1024 * 1024;

function parseAffiliateId(value: string) {
  const id = Number.parseInt(value, 10);
  return Number.isInteger(id) && id > 0 ? id : null;
}

function parseOrder(value: FormDataEntryValue | null) {
  const order = Number.parseInt(String(value ?? '0'), 10);
  return Number.isFinite(order) ? order : 0;
}

function validateLogo(logo: File) {
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

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  let newPublicId: string | null = null;

  try {
    const { id } = await params;
    const affiliateId = parseAffiliateId(id);

    if (!affiliateId) {
      return NextResponse.json({ error: 'Invalid affiliate id' }, { status: 400 });
    }

    const existing = await prisma.affiliate.findUnique({ where: { id: affiliateId } });
    if (!existing) {
      return NextResponse.json({ error: 'Affiliate not found' }, { status: 404 });
    }

    const formData = await request.formData();
    const name = String(formData.get('name') ?? '').trim();
    const website = String(formData.get('website') ?? '').trim() || null;
    const description = String(formData.get('description') ?? '').trim() || null;
    const logoEntry = formData.get('logo');
    const newLogo = logoEntry instanceof File && logoEntry.size > 0 ? logoEntry : null;

    if (!name) {
      return NextResponse.json({ error: 'Affiliate name is required' }, { status: 400 });
    }

    let logoUrl = existing.logoUrl;
    let logoPublicId = existing.logoPublicId;

    if (newLogo) {
      const logoError = validateLogo(newLogo);
      if (logoError) {
        return NextResponse.json({ error: logoError }, { status: 400 });
      }

      const uploadResult = await uploadLogo(newLogo);
      logoUrl = uploadResult.secure_url;
      logoPublicId = uploadResult.public_id;
      newPublicId = uploadResult.public_id;
    }

    const affiliate = await prisma.affiliate.update({
      where: { id: affiliateId },
      data: {
        name,
        website,
        description,
        logoUrl,
        logoPublicId,
        order: parseOrder(formData.get('order')),
        isActive: formData.get('isActive') !== 'false',
      },
    });

    if (newPublicId && existing.logoPublicId !== newPublicId) {
      await cloudinary.uploader.destroy(existing.logoPublicId).catch(() => undefined);
    }

    revalidatePath('/about');
    return NextResponse.json(affiliate);
  } catch (error) {
    if (newPublicId) {
      await cloudinary.uploader.destroy(newPublicId).catch(() => undefined);
    }

    console.error('Failed to update affiliate:', error);
    return NextResponse.json({ error: 'Failed to update affiliate' }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const affiliateId = parseAffiliateId(id);

    if (!affiliateId) {
      return NextResponse.json({ error: 'Invalid affiliate id' }, { status: 400 });
    }

    const existing = await prisma.affiliate.findUnique({ where: { id: affiliateId } });
    if (!existing) {
      return NextResponse.json({ error: 'Affiliate not found' }, { status: 404 });
    }

    await prisma.affiliate.delete({ where: { id: affiliateId } });
    await cloudinary.uploader.destroy(existing.logoPublicId).catch(() => undefined);

    revalidatePath('/about');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete affiliate:', error);
    return NextResponse.json({ error: 'Failed to delete affiliate' }, { status: 500 });
  }
}
