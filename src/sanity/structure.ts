import type { StructureResolver } from "sanity/structure";

/**
 * Site Settings, Konten Hero, dan Konten About masing-masing hanya boleh
 * ada 1 dokumen (singleton) -- bukan daftar yang bisa di-"+ Create"
 * berkali-kali seperti Divisi/Event/dst. Struktur ini mengunci ketiganya
 * ke document ID tetap dan menyembunyikannya dari daftar tipe dokumen
 * biasa di bawahnya.
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
      S.divider(),
      ...S.documentTypeListItems().filter(
        (listItem) =>
          listItem.getId() !== "siteSettings" &&
          listItem.getId() !== "heroContent" &&
          listItem.getId() !== "aboutContent"
      ),
    ]);
