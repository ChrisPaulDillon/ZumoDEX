/** @type {import('next-seo').DefaultSeoProps} */
const defaultSEOConfig = {
  title: "Zumo Swap",
  titleTemplate: "%s | zumo-swap",
  defaultTitle: "Zumo Swap",
  description: "Zumo Swap DEX",
  canonical: "https://zumo-swap.sznm.dev",
  openGraph: {
    url: "https://zumo-swap.sznm.dev",
    title: "zumo-swap",
    description: "Zumo Swap DEX",
    images: [
      {
        url: "https://og-image.sznm.dev/**zumo-swap**.sznm.dev.png?theme=dark&md=1&fontSize=125px&images=https%3A%2F%2Fsznm.dev%2Favataaars.svg&widths=250",
        alt: "zumo-swap.sznm.dev og-image",
      },
    ],
    site_name: "zumo-swap",
  },
  twitter: {
    handle: "@sozonome",
    cardType: "summary_large_image",
  },
};

export default defaultSEOConfig;
