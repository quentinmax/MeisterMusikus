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
const isProduction = process.env.NODE_ENV === "production";
const path = isProduction ? "./dist" : "./src";
const { DISCORD_BOT_TOKEN } = process.env;
const client = new Client({
    intents: ["Guilds", "GuildMessages", "MessageContent", "GuildVoiceStates"],
});
client.distube = new DisTube(client, {
    leaveOnStop: false,
    emitNewSongOnly: true,
    emitAddSongWhenCreatingQueue: false,
    emitAddListWhenCreatingQueue: false,
    plugins: [
        new SpotifyPlugin({
            api: {
                clientId: "c602e924c1b14959aec3fbe3fffe389b",
                clientSecret: "26d30216a4e34ce199d8fc6bf3d3130f",
            },
        }),
        new YtDlpPlugin(),
    ],
});
client.commands = new Collection();
client.commandArray = [];
client.color = "#f00";
client.buttons = new Collection();
client.aliases = new Collection();
const functionFolders = fs.readdirSync(`${path}/functions`);
for (const folder of functionFolders) {
    const functionFiles = fs
        .readdirSync(`${path}/functions/${folder}`)
        .filter((file) => file.endsWith(process.env.NODE_ENV === "production" ? ".js" : ".ts"));
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
