import { NextRequest, NextResponse } from "next/server";
import OpenAI, { toFile } from "openai";
import sharp from "sharp";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OpenAI API key not configured. Add OPENAI_API_KEY to .env.local" },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const imageFile = formData.get("image") as File | null;

    if (!imageFile) {
      return NextResponse.json(
        { error: "No image uploaded" },
        { status: 400 }
      );
    }

    if (!imageFile.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Invalid file type. Please upload an image." },
        { status: 400 }
      );
    }

    if (imageFile.size > 20 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Image too large. Maximum 20MB." },
        { status: 400 }
      );
    }

    const bytes = await imageFile.arrayBuffer();
    const rawBuffer = Buffer.from(bytes);

    const optimizedBuffer = await sharp(rawBuffer)
      .resize(1024, 1024, { fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: 85 })
      .toBuffer();

    const userFile = await toFile(optimizedBuffer, "user_photo.jpg", {
      type: "image/jpeg",
    });

    const prompt = `Edit this image to create a "goblinified" version. This is a meme-style transformation where the subject gets turned into a goblin creature.

CRITICAL RULES:
- Keep the EXACT same composition, pose, framing, and background from the original image
- Keep recognizable elements: hair style, clothing, accessories, setting
- Transform the subject into a GOBLIN: green skin, pointy ears, sharp crooked teeth, bulbous nose, warts/bumps, sunken glowing eyes
- The skin must be sickly GREEN — this is the most important visual change
- Add goblin features: large pointy ears sticking out, sharp teeth, wrinkled/warty skin, beady yellow or red eyes
- The body can become more hunched/scrawny but should maintain the original pose  
- If it's a person, their face should morph into a goblin face while keeping some features recognizable (hair, glasses, hat, etc.)
- If it's a character or meme, transform it into a goblin version of that same character/meme
- Style: dark fantasy CGI rendering, like a high-quality 3D render with swampy/dungeon atmosphere
- The result should be funny and meme-worthy — goblins are greedy, mischievous little creatures
- DO NOT change the background or setting significantly
- DO NOT create a completely new image - this must be clearly a transformation of the input`;

    const response = await openai.images.edit({
      model: "gpt-image-2",
      image: userFile,
      prompt,
      size: "1024x1024",
      quality: "low",
    });

    const generatedImage = response.data?.[0];
    if (!generatedImage?.b64_json) {
      return NextResponse.json(
        { error: "Failed to generate goblinified image" },
        { status: 500 }
      );
    }

    const resultDataUrl = `data:image/png;base64,${generatedImage.b64_json}`;

    return NextResponse.json({ image: resultDataUrl });
  } catch (error: unknown) {
    console.error("Goblinification error:", error);

    if (error instanceof OpenAI.APIError) {
      if (error.status === 429) {
        return NextResponse.json(
          { error: "Rate limited. Please wait a moment and try again." },
          { status: 429 }
        );
      }
      if (error.status === 403) {
        return NextResponse.json(
          { error: "OpenAI API access denied. Organization verification may be required." },
          { status: 403 }
        );
      }
      return NextResponse.json(
        { error: `OpenAI API error: ${error.message}` },
        { status: error.status || 500 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error during goblinification" },
      { status: 500 }
    );
  }
}
