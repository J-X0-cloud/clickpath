export interface FaqItem {
  question: string;
  answer: string;
}

export const LINKS_FAQ: readonly FaqItem[] = [
  {
    question: "Will short links hurt my ad approval or quality score?",
    answer:
      "No. Clickpath uses a fast server-side redirect on your own domain, and ad platforms see the final destination URL during review. Many teams paste the final UTM URL into the ad and use the short link everywhere else.",
  },
  {
    question: "Can I migrate links from another shortener?",
    answer:
      "Yes. Import a CSV of slugs and destinations, point your domain at Clickpath, and existing links keep working with the same paths.",
  },
  {
    question: "What happens to UTMs when a link redirects?",
    answer:
      "UTMs are appended to the destination at redirect time, alongside a first-party click ID. Any parameters already on the destination are preserved.",
  },
  {
    question: "Do QR codes need to be reprinted if I change the destination?",
    answer:
      "No. The QR code encodes the short link, so you can change where it points at any time without touching printed material.",
  },
];

export const PRICING_FAQ: readonly FaqItem[] = [
  {
    question: "What counts as a tracked event?",
    answer:
      "A click on a link with tracking enabled, a lead, or a sale. Conversions forwarded to several ad platforms still count once.",
  },
  {
    question: "What happens if I go over my plan?",
    answer:
      "Tracking never stops mid-campaign. We’ll let you know at 80% and 100% of your allowance, and you can upgrade or buy an event pack for the month.",
  },
  {
    question: "Do you offer agency pricing?",
    answer:
      "Yes. Scale includes multiple workspaces for client brands, and agencies managing more than five clients can ask us about volume pricing.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Monthly plans can be cancelled at any time from settings. Your links keep redirecting on the Starter plan after you downgrade.",
  },
];
