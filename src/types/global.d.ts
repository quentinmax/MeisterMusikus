import { Client } from "discord.js";
import { DisTube } from "distube";

export {};

declare global {
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
}
