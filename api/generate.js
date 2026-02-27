import Replicate from "replicate";

export const config = {
  api: { bodyParser: false },
};

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Only POST allowed" });
    }

    // NOTE (beginner safe):
    // Mobile se direct image upload ko parse karna extra setup mangta hai.
    // Abhi sirf test ke liye prompt se video banate hain.
    // Next step me main upload working (Vercel Blob) version dunga.

    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    });

    const output = await replicate.run("kwaivgi/kling-v2.1", {
      input: {
        prompt: "Smooth cinematic camera motion, realistic movement",
        // Temporary: start_image URL required for real run.
        // Next step: we'll upload your image and pass the URL here.
        start_image:
          "https://replicate.delivery/xezq/rfKExHkg7L2UAyYNJj3p1YrW1M3ZROTQQXupJSOyM5RkwQcKA/tmpowaafuyw.png",
      },
    });

    return res.status(200).json({ url: output.url() });
  } catch (e) {
    return res.status(500).json({ error: e?.message || String(e) });
  }
}
