import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { status, adminNote } = body;

    const member = await prisma.member.update({
      where: { id: parseInt(id) },
      data: {
        ...(status && { status }),
        ...(adminNote !== undefined && { adminNote }),
      },
    });

    return NextResponse.json({ success: true, member });
  } catch (error) {
    console.error("Error updating member:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update member" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.member.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting member:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete member" },
      { status: 500 }
    );
  }
}
