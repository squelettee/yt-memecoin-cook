"use server";

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export async function uploadToS3(file: File, key: string) {
  try {
    const s3Client = new S3Client({
      region: process.env.AWS_S3_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });

    const fileBuffer = await file.arrayBuffer();
    const fileKey = `${key}`;

    await s3Client.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET,
        Key: fileKey,
        Body: Buffer.from(fileBuffer),
        ContentType: file.type,
      }),
    );

    const url = `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${fileKey}`;

    return {
      success: true,
      url,
    };
  } catch (error) {
    console.error("Error uploading to S3:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to upload file",
    };
  }
}
