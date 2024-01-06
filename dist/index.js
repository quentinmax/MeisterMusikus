var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { SpotifyPlugin } from "@distube/spotify";
import { YtDlpPlugin } from "@distube/yt-dlp";
import * as fs from "fs";
import { Client, Collection } from "discord.js";
import * as dotenv from "dotenv";
import { DisTube } from "distube";
dotenv.config();
const { DISCORD_BOT_TOKEN } = process.env;
const client = new Client({
    intents: ["Guilds", "GuildMessages", "MessageContent", "GuildVoiceStates"],
});
client.distube = new DisTube(client, {
    leaveOnStop: false,
    emitNewSongOnly: true,
    emitAddSongWhenCreatingQueue: false,
    emitAddListWhenCreatingQueue: false,
    plugins: [new SpotifyPlugin(), new YtDlpPlugin()],
});
client.commands = new Collection();
client.commandArray = [];
client.color = "#f00";
client.buttons = new Collection();
client.aliases = new Collection();
const functionFolders = fs.readdirSync(`./src/functions`);
for (const folder of functionFolders) {
    const functionFiles = fs
        .readdirSync(`./src/functions/${folder}`)
        .filter((file) => file.endsWith(".js"));
    (() => __awaiter(void 0, void 0, void 0, function* () {
        for (const file of functionFiles) {
            const module = yield import(`./functions/${folder}/${file}`);
            module.default(client);
        }
    }))();
}
// client.handleEvents();
// client.handleCommands();
// client.handleComponents();
client.login(DISCORD_BOT_TOKEN);
