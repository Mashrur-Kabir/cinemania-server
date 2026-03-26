// ONE TIME SCRIPT

import { prisma } from "../lib/prisma";

async function main() {
  const badges = [
    // --- VOLUME CATEGORY ---
    {
      name: "First Cut",
      category: "VOLUME",
      description: "Watch your 1st movie",
      criteria: { type: "WATCH_COUNT", value: 1 },
      icon: "badge_first_cut",
    },
    {
      name: "Cinephile",
      category: "VOLUME",
      description: "Watch 50 movies",
      criteria: { type: "WATCH_COUNT", value: 50 },
      icon: "badge_cinephile",
    },
    {
      name: "Cinema Legend",
      category: "VOLUME",
      description: "Watch 200 movies",
      criteria: { type: "WATCH_COUNT", value: 200 },
      icon: "badge_legend",
    },

    // --- GENRE CATEGORY ---
    {
      name: "Scream Queen/King",
      category: "GENRE",
      description: "Watch 10 Horror movies",
      criteria: { type: "GENRE_COUNT", value: 10, genreName: "Horror" },
      icon: "badge_horror",
    },
    {
      name: "Adrenaline Junkie",
      category: "GENRE",
      description: "Watch 10 Action movies",
      criteria: { type: "GENRE_COUNT", value: 10, genreName: "Action" },
      icon: "badge_action",
    },
    {
      name: "Space Cadet",
      category: "GENRE",
      description: "Watch 10 Sci-Fi movies",
      criteria: { type: "GENRE_COUNT", value: 10, genreName: "Sci-Fi" },
      icon: "badge_scifi",
    },

    // --- SOCIAL CATEGORY ---
    {
      name: "Rising Star",
      category: "SOCIAL",
      description: "Gain 50 followers",
      criteria: { type: "FOLLOWER_COUNT", value: 50 },
      icon: "badge_followers",
    },
    {
      name: "Socialite",
      category: "SOCIAL",
      description: "Follow 50 users",
      criteria: { type: "FOLLOWING_COUNT", value: 50 },
      icon: "badge_following",
    },

    // --- REVIEWING CATEGORY ---
    {
      name: "The Critic",
      category: "REVIEWING",
      description: "Write 10 reviews",
      criteria: { type: "REVIEW_COUNT", value: 10 },
      icon: "badge_critic",
    },

    // --- WATCH STYLE CATEGORY ---
    {
      name: "Marathoner",
      category: "STYLE",
      description: "Watch 3 movies in 24 hours",
      criteria: { type: "MARATHONER", value: 3 },
      icon: "badge_marathon",
    },
    {
      name: "Completionist",
      category: "STYLE",
      description: "Finish 50 movies to 100% progress",
      criteria: { type: "COMPLETIONIST", value: 50 },
      icon: "badge_complete",
    },
    {
      name: "Rewatch King",
      category: "STYLE",
      description: "Log the same movie 3 times",
      criteria: { type: "REWATCH_KING", value: 3 },
      icon: "badge_rewatch",
    },

    // --- SPECIALS ---
    {
      name: "Night Owl",
      category: "TIMING",
      description: "Watch 5 movies between 12 AM – 5 AM",
      criteria: { type: "NIGHT_OWL", value: 5 },
      icon: "badge_night_owl",
    },
    {
      name: "Premium Pass",
      category: "LOYALTY",
      description: "Active Premium Subscriber",
      criteria: { type: "SUBSCRIPTION_TIER", value: 1, tier: "PREMIUM" },
      icon: "badge_premium",
    },
  ];

  console.log("🎬 Seeding badges...");

  for (const b of badges) {
    await prisma.badge.upsert({
      where: { name: b.name },
      update: {},
      create: b,
    });
  }

  console.log("✅ Seed complete: 20 badges available.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
