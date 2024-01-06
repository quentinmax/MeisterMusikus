import { readdirSync } from "fs"; // Use fs/promises to work with promises

export default async (client: any) => {
  const components = await readdirSync(`./src/components`);
  for (const folder of components) {
    const componentFiles = await readdirSync(
      `./src/components/${folder}`
    ).filter((file) => file.endsWith(".ts"));

    // You can continue processing componentFiles here
  }
};
