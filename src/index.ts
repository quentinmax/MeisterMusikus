import { SpotifyPlugin } from "@distube/spotify";
import { YtDlpPlugin } from "@distube/yt-dlp";
import * as fs from "fs";
import { Client, Collection } from "discord.js";
import * as dotenv from "dotenv";
import { DisTube } from "distube";

dotenv.config();

const { DISCORD_BOT_TOKEN } = process.env;

interface BotClient extends Client {
  distube?: DisTube;
  commands?: Collection<unknown, unknown>;
  commandArray?: Array<Collection<unknown, unknown>>;
  color?: string;
  buttons?: Collection<unknown, unknown>;
  aliases?: Collection<unknown, unknown>;
  handleEvents?: Function;
  handleCommands?: Function;
  handleComponents?: Function;
}

const client: BotClient = new Client({
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

const functionFolders = fs.readdirSync(`./src/functions`);
for (const folder of functionFolders) {
  const functionFiles = fs
    .readdirSync(`./src/functions/${folder}`)
    .filter((file) => file.endsWith(".ts"));

  (async () => {
    for (const file of functionFiles) {
      const module = await import(`./functions/${folder}/${file}`);
      module.default(client);
    }
  })();
}

// client.handleEvents();
// client.handleCommands();
// client.handleComponents();

client.login(DISCORD_BOT_TOKEN);
