"use server";

import UploadImage from "@/Backend/actions/ImageActions";
import addItem from "@/Backend/actions/AddItems";

interface Product {
  name: string;
  company: string;
  description: string;
  featured: boolean;
  image: string;
  price: number;
}

export const createProductAction = async (formData: FormData) => {
  const name = formData.get("name") as string;
  const company = formData.get("company") as string;
  const price = formData.get("price") as string;
  const image = formData.get("image") as File;
  const productDescription = formData.get("ProductDescription") as string;

  // Upload image
  const imageUploadResponse = await UploadImage(image);
  const encodedImagePath = image.name ? encodeURIComponent(image.name) : null;

  const product: Product = {
    name,
    company,
    price: parseFloat(price),
    image: `https://wmongmxyifwtvsmqzgzg.supabase.co/storage/v1/object/public/store-bucket/${encodedImagePath}`,
    description: productDescription,
    featured: true,
  };

  await addItem(product); // Add product to the database
};
