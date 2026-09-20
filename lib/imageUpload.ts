import cloudinary from '@/lib/cloudinary';

interface UploadResult {
  secure_url: string;
  public_id: string;
}

/**
 * Uploads an image File/Buffer directly to Cloudinary using upload_stream
 * with automatic format, compression, and dimension optimization.
 */
export async function uploadToCloudinary(
  file: File,
  folder: string,
  maxWidth = 1400
): Promise<UploadResult> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  return new Promise<UploadResult>((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'image',
        transformation: [
          {
            width: maxWidth,
            crop: 'limit',
            quality: 'auto:good',
            fetch_format: 'auto',
          },
        ],
      },
      (error, result) => {
        if (error || !result) {
          console.error('[Cloudinary Upload Error]', error);
          reject(new Error(error?.message || 'Cloudinary upload failed'));
        } else {
          resolve({
            secure_url: result.secure_url,
            public_id: result.public_id,
          });
        }
      }
    );

    uploadStream.end(buffer);
  });
}

/**
 * Safely deletes an image from Cloudinary by its public ID.
 */
export async function deleteFromCloudinary(publicId: string | null | undefined) {
  if (!publicId) return;
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (err) {
    console.warn('[Cloudinary Delete Warning]', err);
  }
}
