import { GetSignedUrlResponse, Storage } from "@google-cloud/storage";

export const getSignedUrl = async (
  storage: Storage,
  bucket: string,
  file: string,
): Promise<GetSignedUrlResponse> => {
  const url = await storage
    .bucket(bucket)
    .file(file)
    .getSignedUrl({
      action: "read",
      expires: (new Date().getTime() / 1000 + 60 * 60 * 1) * 1000, // 1 Hour
    });

  return url;
};
