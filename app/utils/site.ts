const site_url =
  process.env.NEXT_PUBLIC_APP_URL || "https://billyjoesantos.vercel.app/";

export const siteConfig = {
  name: "Lucas | Software Engineer",
  description:
    "Website for Billy Joe Santos",
  url: site_url,
  ogImage: `${site_url}/_static/og-image.png`,
  links: {
    facebook: "https://www.facebook.com/joeee.lucas/",
    github: "https://github.com/santos16426/",
  },
  mailSupport: "santos16426@gmail.com",
};
