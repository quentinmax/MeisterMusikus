import { Channel } from "discord.js";
import { DisTubeError } from "distube";

export default {
  name: "error",
  async execute(channel: any, error: any) {
    if (channel)
      channel.send(
        `An error has accured:` + "`" + error.toString().slice(0, 1974) + "`"
      );
    else console.error(error);
  },
};
