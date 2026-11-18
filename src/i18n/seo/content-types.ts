import type { SeoPageId } from "@/i18n/seo/copy";

export type SeoFaqItem = {
  question: string;
  answer: string;
};

export type SeoSection = {
  heading: string;
  text: string;
};

export type SeoBenefit = {
  title: string;
  text: string;
};

export type SeoPageContent = {
  heading: string;
  intro: string;
  benefitsHeading: string;
  benefits: SeoBenefit[];
  sections?: SeoSection[];
  faqHeading: string;
  faq: SeoFaqItem[];
};

export type SeoPageContentCatalog = Record<SeoPageId, SeoPageContent>;
