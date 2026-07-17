import type { StructureResolver } from "sanity/structure";

/**
 * Site Settings dan Konten Hero masing-masing hanya boleh ada 1 dokumen
 * (singleton) -- bukan daftar yang bisa di-"+ Create" berkali-kali seperti
 * Divisi/Event/dst. Struktur ini mengunci keduanya ke document ID tetap
 * dan menyembunyikannya dari daftar tipe dokumen biasa di bawahnya.
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
      S.divider(),
      ...S.documentTypeListItems().filter(
        (listItem) =>
          listItem.getId() !== "siteSettings" &&
          listItem.getId() !== "heroContent"
      ),
    ]);
