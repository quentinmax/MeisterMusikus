import { Channel, ChatInputCommandInteraction, EmbedBuilder } from "discord.js";
import { DisTubeError } from "distube";

export default {
  name: "searchNoResult",
  async execute(interaction: ChatInputCommandInteraction, query: string) {
    console.log("no result");

    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setColor("Red")
          .setDescription(`:x: | No result for \`${query} \`!`),
      ],
    });
  },
};
