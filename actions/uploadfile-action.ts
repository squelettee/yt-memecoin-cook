"use server"

import { S3Client, ListObjectsCommand, PutObjectCommand } from "@aws-sdk/client-s3";


const Bucket = process.env.NEXT_PUBLIC_AWS_BUCKET;
const s3 = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});

// Récupère la liste des documents
export async function listDocuments() {
  try {
    const response = await s3.send(new ListObjectsCommand({ Bucket }));
    return response?.Contents ?? [];
  } catch (error: unknown) {
    return { error: new Error((error as Error).message) };
  }
}

// Upload un ou plusieurs documents
export async function uploadDocument(formData: FormData) {
  try {
    const files = formData.getAll("file") as File[];

    if (!files || files.length === 0) {
      throw new Error("Aucun fichier n'a été fourni");
    }

    const response = await Promise.all(
      files.map(async (file) => {
        try {
          const Body = Buffer.from(await file.arrayBuffer());

          const command = new PutObjectCommand({
            Bucket,
            Key: file.name,
            Body,
            ContentType: file.type,
          });

          const result = await s3.send(command);
          const meta = result.$metadata;

          if (meta.httpStatusCode !== 200)
            throw new Error(
              `Error uploading file, with status: ${meta.httpStatusCode}`
            );

          const fileUrl = `https://s3.${process.env.NEXT_PUBLIC_AWS_S3_REGION}.amazonaws.com/${Bucket}/${file.name}`;
          return {
            name: file.name,
            status: "success",
            url: fileUrl
          };
        } catch (fileError) {
          console.error(`Erreur pour le fichier ${file.name}:`, fileError);
          return {
            name: file.name,
            status: "error",
            error: (fileError as Error).message
          };
        }
      })
    );

    return response;
  } catch (error: unknown) {
    console.error("Erreur générale:", error);
    return { error: new Error((error as Error).message) };
  }
}