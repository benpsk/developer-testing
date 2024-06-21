/**
 * ! Executing this script will delete all data in your database and seed it with 10 property.
 * ! Make sure to adjust the script to your needs.
 * Use any TypeScript runner to run this script, for example: `npx tsx seed.ts`
 * Learn more about the Seed Client by following our guide: https://docs.snaplet.dev/seed/getting-started
 */
import { createSeedClient } from "@snaplet/seed";
import { generateNumber, imageUrl } from "./helper";

const main = async () => {

  let count = 100;
  const args = process.argv.slice(2);
  if (args.length != 0) {
    let input = +args[0];
    if (typeof input == 'number') count = input;
  }
  const seed = await createSeedClient();

  // Truncate all tables in the database
  await seed.$resetDatabase();

  // Seed the database with 10 property
    await seed.property((x) => x(count, (ctx) => ({
      price: generateNumber(1000, 10000),
      bedroom: generateNumber(1, 5),
      area: generateNumber(20, 200),
      images: (y) => y(5, (c) => ({
        url: imageUrl(ctx.index),
      }))
    })
  ));

  // Type completion not working? You might want to reload your TypeScript Server to pick up the changes

  console.log("Database seeded successfully!");

  process.exit();
};

main();