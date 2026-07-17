import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "./env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // `useCdn: false` = selalu ambil data terbaru langsung dari API live,
  // tanpa cache CDN. Lebih penting untuk situs yang kontennya sering
  // di-update pengurus daripada sedikit lebih cepat tapi bisa telat
  // sampai ~60 detik. Bisa diubah ke `true` lagi nanti kalau trafik
  // sudah besar dan kecepatan baca jadi prioritas di atas kesegaran data.
  useCdn: false,
});
