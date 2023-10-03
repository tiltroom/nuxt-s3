import { defineEventHandler } from "#imports";
import { normalizeKey, storage, getKey } from "#s3";
import { readMultipartFormData, createError } from "h3";

export default defineEventHandler(async (event) => {
  const key = getKey(event);

  const multipartFormData = await readMultipartFormData(event);

  const file = multipartFormData?.find((el) => el.name === "file");

  if (file && file.type) {
    const normalizedKey = normalizeKey(key);

    await storage.setItemRaw(normalizedKey, file.data, {
      type: file.type,
    });

    return "ok";
  }

  throw createError("invalid-file");
});
