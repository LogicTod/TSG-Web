import type { SchemaTypeDefinition } from "sanity";
import { division } from "./division";
import { achievement } from "./achievement";
import { teamMember } from "./teamMember";
import { event } from "./event";
import { galleryImage } from "./galleryImage";
import { faq } from "./faq";
import { siteSettings } from "./siteSettings";
import { heroContent } from "./heroContent";
import { whyJoinItem } from "./whyJoinItem";

/**
 * Semua schema tipe konten (Divisi, Prestasi, Tim, Event, dst) didaftarkan
 * di sini satu per satu.
 */
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    division,
    achievement,
    teamMember,
    event,
    galleryImage,
    faq,
    siteSettings,
    heroContent,
    whyJoinItem,
  ],
};
