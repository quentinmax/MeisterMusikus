import { readdirSync } from "fs"; // Use fs/promises to work with promises

export default async (client: any) => {
  const isProduction = process.env.NODE_ENV === "production";
  const path = isProduction ? "./dist" : "./src";

  const eventFolders = await readdirSync(`${path}/events`);
  for (const folder of eventFolders) {
    const eventFiles = await readdirSync(`${path}/events/${folder}`).filter(
      (file) => file.endsWith(isProduction ? ".js" : ".ts")
    );

    switch (folder) {
      case "client":
        for (const file of eventFiles) {
          const event = await import(`../../events/${folder}/${file}`);

          if (event.default.once) {
            // console.log(event.default);
            client.once(event.default.name, (...args: any) =>
              event.default.execute(...args, client)
            );
          } else
            client.on(event.default.name, (...args: any) =>
              event.default.execute(...args, client)
            );
        }
        break;

      case "distube":
        for (const file of eventFiles) {
          const event = await import(`../../events/${folder}/${file}`);
          client.distube.on(event.default.name, (...args: any) =>
            event.default.execute(...args, client)
          );
        }

      default:
        break;
    }
  }
};
