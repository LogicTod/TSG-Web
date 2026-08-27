export const EXTERNAL_URLS = {
  registration: "https://sites.google.com/view/form-registrasi-tsg/registrasi-tsg",
  instagram: "https://instagram.com/thesmartgeneration",
  aboutPage: "https://thesmartgeneration.vercel.app/about",
};

export const getWhatsAppUrl = (whatsappNumber: string, text?: string) => {
  const cleanNumber = whatsappNumber.replace(/[^0-9]/g, "");
  const base = `https://wa.me/${cleanNumber}`;
  if (text) {
    return `${base}?text=${encodeURIComponent(text)}`;
  }
  return base;
};
