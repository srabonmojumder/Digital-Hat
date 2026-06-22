// Site-wide brand + contact constants. These are placeholders for the
// prototype — swap for real values (or wire to a CMS) in a later milestone.

export const site = {
  name: "Digital Hat",
  tagline: "Premium Fashion & Leather",
  description:
    "Digital Hat — premium Panjabi, 100% leather wallets, belts & more. Cash on Delivery across Bangladesh. অর্ডার করুন সহজেই।",

  // Contact / ordering channels
  hotline: "01711-000000",
  hotlineTel: "+8801711000000",
  whatsapp: "8801711000000", // used in https://wa.me/<number>
  messenger: "digitalhat", // used in https://m.me/<page>
  email: "support@digitalhat.com",
  address: "Level 4, House 12, Road 7, Banani, Dhaka 1213, Bangladesh",

  // Social
  facebook: "https://facebook.com/digitalhat",
  instagram: "https://instagram.com/digitalhat",
  youtube: "https://youtube.com/@digitalhat",

  // Trust / About Us
  tradeLicense: "TRAD/DNCC/0123456/2026",
  licenseAuthority: "Dhaka North City Corporation (DNCC)",
  foundedYear: 2019,
  businessType: "Retail & E-commerce — Fashion & Leather Goods",
} as const;

/** Offer text shown in the top announcement bar (Bangla). */
export const announcement =
  "ঈদ স্পেশাল: প্রতিটি পাঞ্জাবির সাথে একটি ১০০% লেদারের ওয়ালেট ফ্রি।";
