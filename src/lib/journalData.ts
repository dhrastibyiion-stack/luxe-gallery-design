import serumImg from "@/assets/product-serum.jpg";
import heroImg from "@/assets/hero-beauty.jpg";
import oilImg from "@/assets/product-oil.jpg";

export type JournalPost = {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  image: string;
  quote: string;
  content: string[];
};

export const journalPosts: JournalPost[] = [
  {
    slug: "anatomy-of-a-botanical-serum",
    title: "The Anatomy of a Botanical Serum",
    category: "Ingredients",
    date: "October 6, 2026",
    readTime: "5 min read",
    excerpt:
      "What actually lives inside the amber glass? We break down every drop of our Renewal Serum — from wildcrafted rosehip to a whisper of chamomile.",
    image: serumImg,
    quote:
      "A great serum is not a list of ingredients. It is a conversation between plants and skin.",
    content: [
      "Every Botanica serum begins in the field, not the laboratory. Our rosehip is hand-harvested at the end of summer when its vitamin C content peaks, then cold-pressed within seventy-two hours to preserve every fragile nutrient. Speed matters: oxidative damage begins the moment a seed is crushed.",
      "The base of the Renewal Serum is a triple-infusion of rosehip, jojoba and lavender. Jojoba mimics the skin's own sebum, which means it carries the actives deep into the lipid barrier without a hint of greasiness. Lavender, distilled slowly at low temperature, keeps the blend calm and stable.",
      "We add nothing to dilute, nothing to preserve beyond a natural vitamin E antioxidant, and nothing to make the texture feel artificially silky. What looks like simplicity is actually precision — every ratio is measured to the tenth of a percent.",
      "The result is a serum that behaves like skin food rather than a cosmetic: it feeds, repairs and protects. Used nightly, most people notice a softer texture within a week and a visible evening of tone as their renewal cycle completes around week six.",
      "That is the anatomy. Three plants, one intention, and the patience to let nature do the heavy lifting.",
    ],
  },
  {
    slug: "morning-rituals-from-our-founders-kitchen",
    title: "Morning Rituals from Our Founder's Kitchen",
    category: "Rituals",
    date: "September 22, 2026",
    readTime: "4 min read",
    excerpt:
      "Before there was a brand, there was a kitchen table, a copper pot, and a stubborn belief that skincare should feel like a ceremony.",
    image: heroImg,
    quote: "Ritual is what turns a habit into a moment you actually look forward to.",
    content: [
      "Botanica was born at a kitchen table in Provence, between a hanging bundle of dried lavender and a copper pot that had seen better decades. Our founder, a trained herbalist, began blending oils for neighbours whose skin had been worn down by city living and harsh products.",
      "The first rule of that kitchen was slowness. Infusions steeped for weeks, not hours. Nothing was rushed, heated or forced. That patience is still our manufacturing principle today, scaled up but never speeded up.",
      "A morning ritual, we believe, should take five unhurried minutes: warm the oil between your palms, press it into damp skin, and breathe in the botanicals before the day begins. It is skincare as a pause, not a task.",
      "We asked three of our long-time customers to describe their rituals. One lights a candle. One waters her plants first. One simply sits by an open window. The product is the same; the ceremony belongs to each of them.",
      "However your morning begins, we hope a little slowness finds its way in.",
    ],
  },
  {
    slug: "why-cold-pressed-oils-outperform",
    title: "Why Cold-Pressed Oils Outperform",
    category: "Science",
    date: "September 9, 2026",
    readTime: "6 min read",
    excerpt:
      "Heat is the quiet enemy of botanical potency. Here is the science behind cold-pressing — and why we refuse to refine anything.",
    image: oilImg,
    quote: "Heat is the quiet enemy of potency. We press cool, filter gently, and bottle quickly.",
    content: [
      "Most commercial oils are extracted with heat and solvents because it is fast and yields more. The trade-off is silent: polyphenols, carotenoids and delicate vitamin fractions degrade at temperatures well below those used in standard refining.",
      "Cold-pressing keeps the entire pressing chain under 40°C. The yield is smaller and the cost higher, but what arrives in the bottle is the plant as it grew — complete, unrefined and biologically active.",
      "Unrefined oils also carry their natural scent. A rosehip oil that smells faintly of earth and seeds is not an imperfect product; it is an honest one. We choose that honesty over a deodorised neutral.",
      "In formulation terms, unrefined oils retain a broader spectrum of fatty acids — particularly omega-3 and omega-6 — which support the skin barrier and calm visible redness. Refined versions keep the texture and lose the function.",
      "This is why every oil in our collection states its pressing method on the label. Transparency is part of the formula.",
    ],
  },
  {
    slug: "what-clean-beauty-really-means",
    title: "Reading a Label: What 'Clean Beauty' Really Means",
    category: "Guide",
    date: "August 27, 2026",
    readTime: "5 min read",
    excerpt:
      "The words on the front of a bottle are marketing. The words on the back are truth. A short guide to reading ingredient lists with confidence.",
    image:
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=1200&h=800&fit=crop",
    quote: "The front of the bottle is marketing. The back is the truth.",
    content: [
      "Ingredient lists follow a strict global convention: components above one percent are listed in descending order, everything below one percent may appear in any order after them. This single rule unlocks almost everything you need to know.",
      "If a hero botanical appears after the preservative, it is present in homeopathic amounts. If a base oil leads the list, the formula is genuinely oil-forward. Position tells you concentration; concentration tells you intention.",
      "Beware of marketing terms that have no legal definition — 'natural', 'clean' and 'green-washed' labelling varies wildly between brands. Certifications such as cruelty-free logos and organic marks are audited; vague adjectives are not.",
      "Our own promise is simple: every ingredient is plant-derived or naturally occurring, preservation is minimal and clearly stated, and the full sourcing method is printed on each carton. If we cannot explain an ingredient in one honest sentence, we do not use it.",
      "Read the back of the bottle. Your skin will thank you for it.",
    ],
  },
  {
    slug: "harvest-diary-lavender-fields-of-provence",
    title: "Harvest Diary: Lavender Fields of Provence",
    category: "Sourcing",
    date: "August 12, 2026",
    readTime: "4 min read",
    excerpt:
      "Three July days at 900 metres, cutting lavender at the exact hour its essential oil peaks. Notes from our annual sourcing trip.",
    image:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1200&h=800&fit=crop",
    quote: "The field decides the harvest. We simply listen.",
    content: [
      "Altitude changes everything. Our lavender grows at 900 metres on a plateau where cool nights slow the plant's metabolism and concentrate its essential oil. The same variety farmed at sea level yields nearly a third less aroma.",
      "We harvest in late July, beginning at dawn while the oil is still held in the flower heads. By mid-afternoon the heat has lifted much of it into the air — which is wonderful for walking through, and terrible for cutting.",
      "The distillation happens the same day, in a small copper still run by the family who has farmed this plateau for four generations. Slow distillation at low pressure produces an oil that is rounder and softer than industrial extracts.",
      "Every year we walk the rows with the growers and taste the air, so to speak. Some years the oil is greener and sharper; others, deeper and honeyed. We adjust the formulation to the harvest rather than forcing the harvest to a specification.",
      "It is slower. It is also why our lavender behaves the way it does on skin.",
    ],
  },
];

export const journalCategories = [
  "All",
  ...Array.from(new Set(journalPosts.map((p) => p.category))),
];
