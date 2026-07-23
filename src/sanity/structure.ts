import type { StructureResolver } from "sanity/structure";

/**
 * Site Settings, Konten Hero, Konten About, dan Preview Seragam 3D
 * masing-masing hanya boleh ada 1 dokumen (singleton) -- bukan daftar
 * yang bisa di-"+ Create" berkali-kali seperti Divisi/Event/dst.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Konten")
    .items([
      S.listItem()
        .title("Pengaturan Situs")
        .id("siteSettings")
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings")
        ),
      S.listItem()
        .title("Konten Hero (Home)")
        .id("heroContent")
        .child(
          S.document().schemaType("heroContent").documentId("heroContent")
        ),
      S.listItem()
        .title("Konten About (Visi & Misi)")
        .id("aboutContent")
        .child(
          S.document().schemaType("aboutContent").documentId("aboutContent")
        ),
      S.listItem()
        .title("Preview Seragam 3D")
        .id("uniformShowcase")
        .child(
          S.document()
            .schemaType("uniformShowcase")
            .documentId("uniformShowcase")
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (listItem) =>
          listItem.getId() !== "siteSettings" &&
          listItem.getId() !== "heroContent" &&
          listItem.getId() !== "aboutContent" &&
          listItem.getId() !== "uniformShowcase"
      ),
    ]);
