import "dotenv/config";
import { PrismaClient } from "./generated/prisma-node/client";

const TAGS = [
  "Technology",
  "Programming",
  "Design",
  "Productivity",
  "Startups",
  "AI",
  "Life",
  "Health",
  "Finance",
  "Writing",
];

async function main() {
  const prisma = new PrismaClient({
    accelerateUrl: process.env.DATABASE_URL!,
  });

  for (const name of TAGS) {
    await prisma.tag.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  console.log(`Seeded ${TAGS.length} tags.`);
  await prisma.$disconnect();
}

main().catch(async (err) => {
  console.error(err);
  process.exit(1);
});
