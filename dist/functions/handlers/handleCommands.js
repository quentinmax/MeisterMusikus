var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Import required modules
import { Routes } from "discord-api-types/v9";
import { REST } from "discord.js";
import * as fs from "fs";
// Destructure environment variables
const { DISCORD_BOT_TOKEN, DISCORD_APP_ID } = process.env;
const isProduction = process.env.NODE_ENV === "production";
const path = isProduction ? "./dist" : "./src";
// Export the function as a named export
export default (client) => __awaiter(void 0, void 0, void 0, function* () {
    const commandFolders = fs.readdirSync(`${path}/commands`);
    const { commands, commandArray } = client;
    for (const folder of commandFolders) {
        const commandFiles = fs
            .readdirSync(`${path}/commands/${folder}`)
            .filter((file) => file.endsWith(isProduction ? ".js" : ".ts"));
        for (const file of commandFiles) {
            const { default: command } = yield import(`../../commands/${folder}/${file}`);
            commands.set(command.data.name, command);
            commandArray.push(command.data.toJSON());
            console.log(`Command: ${command.data.name} has been loaded.`);
        }
    }
    const appId = DISCORD_APP_ID;
    const rest = new REST({ version: "10" }).setToken(DISCORD_BOT_TOKEN);
    try {
        console.log("Started refreshing application (/) commands.");
        yield rest.put(Routes.applicationCommands(appId), {
            body: client.commandArray,
        });
        console.log("Successfully reloaded application (/) commands.");
    }
    catch (error) {
        console.log("ERROR -------------------");
        console.error(error);
    }
});
