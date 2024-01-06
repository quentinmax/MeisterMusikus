import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { setTimeout } from "timers/promises";

export default {
  data: new SlashCommandBuilder()
    .setName("skip")
    .setDescription("Skips the current song"),

  async execute(interaction: any, client: any) {
    if (!interaction.member.voice.channel)
      return interaction.reply(
        "Please join a voice channel to use this command."
      );

    const queue = await client.distube.getQueue(interaction.guildId);

    let description = "";

    if (!queue || !queue.songs) {
      description = "Nothing to skip.";
    } else if (queue.songs.length > 1) {
      client.distube.skip(interaction.guildId);
    } else if (queue.songs.length === 1) {
      console.log("Stoppping");

      client.distube.stop(interaction.guildId);
    }

    const embed = new EmbedBuilder();
    embed
      .setColor("Blue")
      .setDescription(
        description
          ? description
          : `Skipped **${queue.songs[0].name}**. :track_next:`
      );

    await interaction.reply({
      embeds: [embed],
    });

    await setTimeout(2500);
    await interaction.deleteReply();
  },
};
