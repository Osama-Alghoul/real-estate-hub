import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { existsSync } from 'fs';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename with timestamp
    const timestamp = Date.now();
    const fileExtension = path.extname(file.name);
    const fileName = `${timestamp}${fileExtension}`;

    // Define upload directory
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    
    // Create directory if it doesn't exist
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    // Write file to disk
    const filePath = path.join(uploadDir, fileName);
    await writeFile(filePath, buffer);

    // Return public URL
    const publicUrl = `/uploads/${fileName}`;
    
    return NextResponse.json({ url: publicUrl }, { status: 200 });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}
