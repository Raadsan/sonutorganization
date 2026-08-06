import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function GET() {
  try {
    const email = 'admin@sonut.org';
    const password = 'AdminPassword123!';

    const existingAdmin = await prisma.admin.findUnique({ where: { email } });
    
    if (existingAdmin) {
      return NextResponse.json({ message: 'Admin already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await prisma.admin.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ message: 'Admin created successfully', email: admin.email });
  } catch (error) {
    console.error(error);
    const details = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: 'Failed to create admin', details }, { status: 500 });
  }
}
