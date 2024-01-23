import { getPlaiceholder } from "plaiceholder";

export async function imgToBase64(img:string) {
    try {
        const buffer = await fetch(img).then(async (res) =>
          Buffer.from(await res.arrayBuffer())
        );
        const { base64 } = await getPlaiceholder(buffer);
        return base64
      } catch (err) {
        console.error(err)
      }
}