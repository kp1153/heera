import { NextResponse } from "next/server";
import formidable from "formidable";
import fs from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req) {
  const form = new formidable.IncomingForm();
  form.uploadDir = path.join(process.cwd(), "public/uploads");
  form.keepExtensions = true;

  try {
    const fields = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        else resolve({ fields, files });
      });
    });

    const file = fields.files[0];
    const filePath = path.join(form.uploadDir, file.newFilename);

    return NextResponse.json({ filePath });
  } catch (error) {
    return NextResponse.json({ error: "File upload failed" }, { status: 500 });
  }
}
