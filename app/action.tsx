'use server'

import { getPlaiceholder } from "plaiceholder";

export async function imgTobase64(src:string) {
    try {
      const buffer = await fetch(src).then(async (res) =>
        Buffer.from(await res.arrayBuffer())
      );
      const { base64 } = await getPlaiceholder(buffer);
      return base64
    } catch (err) {
      // TODO : 에러처리 하기
      err;
    }
  }