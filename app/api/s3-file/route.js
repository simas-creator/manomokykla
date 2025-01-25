import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import sharp from "sharp";
import { NextResponse } from "next/server";

const s3Client = new S3Client({
    region: process.env.NEXT_PUBLIC_AWS_S3_REGION,
    credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_AWS_S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.NEXT_PUBLIC_AWS_S3_SECRET_ACCESS_KEY,
    },
});

async function uploadSchoolPic(fileBuffer, fileName) {
    const uploadParams = {
        Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME,
        Key: `mokyklos/${fileName}-${Date.now()}.jpg`,
        Body: fileBuffer,
        ContentType: "image/jpeg",
    };

    const command = new PutObjectCommand(uploadParams);
    await s3Client.send(command);
    return uploadParams.Key;
}

async function uploadTeacherPic(fileBuffer, fileName) {
    const uploadParams = {
        Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME,
        Key: `mokytojai/${fileName}-${Date.now()}.jpg`,
        Body: fileBuffer,
        ContentType: "image/jpeg",
    };

    const command = new PutObjectCommand(uploadParams);
    await s3Client.send(command);
    return uploadParams.Key;
}

export async function POST(req) {
    try {
        const formData = await req.formData();

        const file = formData.get("file");
        const t1 = formData.get("mokytojas");
        const t2 = formData.get("mokykla");

        if (!file) {
            return NextResponse.json({ error: "Failas yra privalomas" }, { status: 400 });
        }

        // Convert the file to a buffer
        const originalBuffer = Buffer.from(await file.arrayBuffer());

        // Resize the image using Sharp
        const resizedBuffer = await sharp(originalBuffer)
            .resize(800, 600, { fit: "inside" }) // Resize to fit within 800x600 while maintaining aspect ratio
            .jpeg({ quality: 80 }) // Compress to 80% quality
            .toBuffer();

        // Upload resized image to S3
        if(t1) {
            const fileName = await uploadTeacherPic(resizedBuffer, file.name);
            return NextResponse.json({ success: true, fileName });
        } else if(t2) {
            const fileName = await uploadSchoolPic(resizedBuffer, file.name);
            return NextResponse.json({ success: true, fileName });
        }
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json({ error: "klaida įkeliant failą" }, { status: 500 });
    }
}
