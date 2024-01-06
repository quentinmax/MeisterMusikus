import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { Queue } from "distube";
import Genius from "genius-lyrics";
const Client = new Genius.Client(); // Scrapes if no key is provided

export default {
  data: new SlashCommandBuilder()
    .setName("lyrics")
    .setDescription("Find lyrics for the current playing or a specified song")
    .addStringOption((option) =>
      option
        .setName("song")
        .setDescription("The song you want to get the lyrics for")
        .setRequired(false)
    ),
  async execute(interaction: any, client: any) {
    if (!interaction.member.voice.channel) {
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription(
              "Please join a voice channel in order to use this command."
            )
            .setColor("Red"),
        ],
        ephemeral: true,
      });
    }

    const queue: Queue = await client.distube!.getQueue(interaction.guildId);
    const song = interaction.options.getString("song") || queue.songs[0].name;
    const searches = await Client.songs.search(song);
    const lyrics = await searches[0].lyrics();

    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle("Lyrics for " + song)
          .setDescription(lyrics),
      ],
    });
  },
};
