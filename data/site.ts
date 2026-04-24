export type Project = {
  name: string;
  summary: string;
  demoUrl: string;
};

export const site = {
  name: "Shannon Fu",
  tagline: "I build small AI idea.",
  intro:
    "An intentionally quiet space for experiments, tiny AI products, and practical ideas worth testing in the real world.",
  projects: [
    {
      name: "Signal Atlas",
      summary: "An AI tool that turns scattered notes into clear next actions for solo builders.",
      demoUrl: "https://example.com/signal-atlas",
    },
    {
      name: "Voice Draft",
      summary: "A lightweight speech-to-concept workspace for shaping product thoughts before they disappear.",
      demoUrl: "https://example.com/voice-draft",
    },
    {
      name: "Tiny Mentor",
      summary: "A compact coaching loop that gives one useful prompt instead of a full chatbot conversation.",
      demoUrl: "https://example.com/tiny-mentor",
    },
  ] satisfies Project[],
  thoughts: [
    "Most AI products should get smaller before they try to get smarter.",
    "A useful interface is often just a good question in the right moment.",
    "Speed matters, but clarity is what people remember.",
    "The best demos feel obvious after you see them once.",
    "New tools become believable when they reduce one real friction point.",
  ],
};
