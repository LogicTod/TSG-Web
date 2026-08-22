import { client } from "./client";
import { urlForImage } from "./image";
import type { GalleryItem, UniformShowcase } from "@/types";
import type { Image } from "sanity";

interface SanityGalleryImage {
  _id: string;
  image: Image;
  alt: string;
  category: string;
  width: number | null;
  height: number | null;
}

export async function getGalleryImages(): Promise<GalleryItem[]> {
  const data = await client.fetch<SanityGalleryImage[]>(
    `*[_type == "galleryImage"] | order(order asc) {
      _id, image, alt, category,
      "width": image.asset->metadata.dimensions.width,
      "height": image.asset->metadata.dimensions.height
    }`
  );

  return data.map((item) => ({
    id: item._id,
    src: urlForImage(item.image).width(800).auto("format").url(),
    alt: item.alt,
    category: item.category,
    width: item.width ?? 800,
    height: item.height ?? 800,
  }));
}

interface SanityUniformShowcase {
  title: string;
  frontImage: Image;
  backImage: Image;
  rightImage: Image;
  leftImage: Image;
}

export async function getUniformShowcase(): Promise<UniformShowcase | null> {
  const data = await client.fetch<SanityUniformShowcase | null>(
    `*[_type == "uniformShowcase"][0] { title, frontImage, backImage, rightImage, leftImage }`
  );

  if (!data) return null;

  return {
    title: data.title,
    front: urlForImage(data.frontImage).width(900).auto("format").url(),
    back: urlForImage(data.backImage).width(900).auto("format").url(),
    right: urlForImage(data.rightImage).width(900).auto("format").url(),
    left: urlForImage(data.leftImage).width(900).auto("format").url(),
  };
}
