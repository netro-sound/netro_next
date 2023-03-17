import { create } from 'zustand';
import { NextSeoProps } from 'next-seo';
import siteConfig from '@/site.config';

interface SeoState extends NextSeoProps {
  setSeo: (seo: NextSeoProps) => void;
  getSeo: () => NextSeoProps;
}

const useSeoStore = create<SeoState>()((set, get) => ({
  title: siteConfig.title,
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    // images: [
    //   {
    //     url: 'https://www.example.ie/og-image-01.jpg',
    //     width: 800,
    //     height: 600,
    //     alt: 'Og Image Alt',
    //   },
    // ],
  },
  twitter: {
    handle: '@handle',
    site: '@site',
    cardType: 'summary_large_image',
  },
  getSeo: () => get(),
  setSeo: (seo: NextSeoProps) => set(seo),
}));

export default useSeoStore;
