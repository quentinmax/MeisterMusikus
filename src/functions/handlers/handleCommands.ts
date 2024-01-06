// Import required modules
import { Routes } from "discord-api-types/v9";
import { REST } from "discord.js";
import * as fs from "fs";

// Destructure environment variables
const { DISCORD_BOT_TOKEN, DISCORD_APP_ID } = process.env;

// Export the function as a named export
export default async (client: any) => {
  const commandFolders = fs.readdirSync("./src/commands");
  const { commands, commandArray } = client;
  for (const folder of commandFolders) {
    const commandFiles = fs
      .readdirSync(`./src/commands/${folder}`)
      .filter((file) => file.endsWith(".ts"));

    for (const file of commandFiles) {
      const { default: command } = await import(
        `../../commands/${folder}/${file}`
      );

      commands.set(command.data.name, command);
      commandArray!.push(command.data.toJSON());
      console.log(`Command: ${command.data.name} has been loaded.`);
    }
  }

  const appId = DISCORD_APP_ID!;
  const rest = new REST({ version: "10" }).setToken(DISCORD_BOT_TOKEN!);

  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationCommands(appId), {
      body: client.commandArray,
    });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.log("ERROR -------------------");
    console.error(error);
  }
};
