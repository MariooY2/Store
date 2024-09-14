"use server";

import supabase from "../supabase"; 

interface UploadImageResponse {
  path: string | null;
  error: Error | null;
}

async function UploadImage(file: File): Promise<UploadImageResponse> {
  try {
    const { data, error } = await supabase.storage
      .from("store-bucket")
      .upload(`${file.name}`, file);

    if (error) {
      throw error;
    }

    console.log("Upload successful:", data);

    return { path: data?.path ?? null, error: null };
  } catch (error) {
    console.error("Error uploading file:", (error as Error).message);

    return { path: null, error: error as Error };
  }
}

export default UploadImage;
