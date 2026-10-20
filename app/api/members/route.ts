import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadFileToCloudinary(file: File, folder = "sonut_members"): Promise<string | null> {
  if (!file || file.size === 0) return null;
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  return new Promise<string | null>((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          reject(error);
        } else {
          resolve(result?.secure_url || null);
        }
      }
    );
    uploadStream.end(buffer);
  });
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    
    // Extract files
    const teacherImageFile = formData.get("teacherImage") as File | null;
    const nationalIdFile = (formData.get("nationalIdImage") || formData.get("nationalId")) as File | null;

    const [teacherImageUrl, nationalIdUrl] = await Promise.all([
      teacherImageFile ? uploadFileToCloudinary(teacherImageFile) : Promise.resolve(null),
      nationalIdFile ? uploadFileToCloudinary(nationalIdFile) : Promise.resolve(null),
    ]);

    const data = Object.fromEntries(formData.entries());

    const member = await prisma.member.create({
      data: {
        fullName: (data.fullName as string) || "",
        motherName: (data.motherName as string) || "",
        gender: (data.gender as string) || "",
        dateOfBirth: (data.dateOfBirth as string) || "",
        placeOfBirth: (data.placeOfBirth as string) || "",
        bloodType: (data.bloodType as string) || "",
        teacherImageUrl,
        nationalIdUrl,
        phone: (data.phone as string) || "",
        email: (data.email as string) || "",
        district: (data.district as string) || "",
        subject: (data.subject as string) || "",
        teachingStatus: (data.teachingStatus as string) || "",
        fieldOfStudy: (data.fieldOfStudy as string) || "",
        teachingLevel: (data.teachingLevel as string) || "",
        institutionName: (data.institutionName as string) || "",
        institutionLocation: (data.institutionLocation as string) || "",
        emergencyName: (data.emergencyName as string) || "",
        emergencyPhone: (data.emergencyPhone as string) || "",
        emergencyPhone2: (data.emergencyPhone2 as string) || "",
        emergencyEmail: (data.emergencyEmail as string) || "",
        membershipCategory: (data.membershipCategory as string) || "Full Member",
        status: "PENDING"
      }
    });

    return NextResponse.json({ success: true, member });
  } catch (error) {
    console.error("Error creating member:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit application" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const members = await prisma.member.findMany({
      orderBy: { createdAt: "desc" }
    });
    return NextResponse.json({ success: true, members });
  } catch (error) {
    console.error("Error fetching members:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch members" },
      { status: 500 }
    );
  }
}
