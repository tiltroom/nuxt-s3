import { defineEventHandler } from "#imports";
import { deleteObject } from "#s3";

export default defineEventHandler(async (event) => {
  const key = event.context.params?.key;

  await deleteObject(key);

  return "ok";
});