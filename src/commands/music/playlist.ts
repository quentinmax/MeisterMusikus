import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
} from "discord.js";
import { SearchResultType, Song } from "distube";
import { setTimeout } from "timers/promises";

export default {
  data: new SlashCommandBuilder()
    .setName("playlist")
    .setDescription("Lets you add a playlist to the queue.")
    .addStringOption((option) =>
      option
        .setName("playlist")
        .setDescription("The playlist's name / URL")
        .setRequired(true)
    ),
  async execute(interaction: any, client: any) {
    if (!interaction.member.voice.channel)
      return interaction.reply(
        "Please join a voice channel to use this command."
      );

    const url = interaction.options.getString("playlist");

    const song: any = await client.distube!.search(url!, {
      type: SearchResultType.PLAYLIST,
    });

    client.distube!.play(interaction.member!.voice.channel, song![0], {
      textChannel: interaction.channel,
      member: interaction.member,
    });
    // const current = client.distube?.getQueue(interaction)!.songs[0];

    const embed = new EmbedBuilder();
    embed
      // .setTitle(`Now playing **${current!.name}**`)
      .setColor("Green")
      .setDescription("Your playlist has been added to the queue.");

    await interaction.reply({
      embeds: [embed],
    });

    await setTimeout(2500);
    await interaction.deleteReply();
  },
};
