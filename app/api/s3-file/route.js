import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";
    const s3CLient = new S3Client({
        region: process.env.NEXT_PUBLIC_AWS_S3_REGION,
        credentials: {
            accessKeyId: process.env.NEXT_PUBLIC_AWS_S3_ACCESS_KEY_ID,
            secretAccessKey: process.env.NEXT_PUBLIC_AWS_S3_SECRET_ACCESS_KEY,
        },
    });

async function uploadToS3(file, fileName) {
    const fileBuffer = file;
    const uploadParams = {
        Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME,
        Key: `mokyklos/${fileName}-${Date.now()}`,
        Body: fileBuffer,
        ContentType: "image/jpeg",
    };

    const command = new PutObjectCommand(uploadParams);
    await s3CLient.send(command);
    return uploadParams.Key;
}

export async function POST(req) {
    try {
        const formData = await req.formData();
        const file = formData.get("file");
        if(!file) {
            return NextResponse.json({ error: "Failas yra privalomas" }, { status: 400 });
        }
        const buffer = Buffer.from(await file.arrayBuffer());
        const fileName = await uploadToS3(buffer, file.name);

        return NextResponse.json({success: true, fileName});
    } catch (error) {
        return NextResponse.json({ error: "klaida įkeliant failą"}, { status: 500 });
    }
}