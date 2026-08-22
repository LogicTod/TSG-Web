import { client } from "./client";
import { urlForImage } from "./image";
import type { Project, ProjectStatus } from "@/types";
import type { Image } from "sanity";

interface SanityProject {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  coverImage: Image;
  status: ProjectStatus;
  divisionName?: string;
  tags?: string[];
  year: number;
}

export async function getProjects(): Promise<Project[]> {
  const data = await client.fetch<SanityProject[]>(
    `*[_type == "project"] | order(year desc) {
      _id, title, slug, description, coverImage, status, tags, year,
      "divisionName": division->name
    }`
  );

  return data.map((item) => ({
    id: item._id,
    title: item.title,
    slug: item.slug?.current ?? "",
    description: item.description,
    coverImage: urlForImage(item.coverImage).width(800).height(500).fit("crop").auto("format").url(),
    status: item.status,
    divisionName: item.divisionName,
    tags: item.tags ?? [],
    year: item.year,
  }));
}

interface SanityProjectDetail extends SanityProject {
  content: unknown[];
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const data = await client.fetch<SanityProjectDetail | null>(
    `*[_type == "project" && slug.current == $slug][0] {
      _id, title, slug, description, coverImage, status, tags, year, content,
      "divisionName": division->name
    }`,
    { slug }
  );

  if (!data) return null;

  return {
    id: data._id,
    title: data.title,
    slug: data.slug?.current ?? "",
    description: data.description,
    coverImage: urlForImage(data.coverImage).width(1200).auto("format").url(),
    status: data.status,
    divisionName: data.divisionName,
    tags: data.tags ?? [],
    year: data.year,
    content: data.content,
  };
}
