import {
  ChatInputCommandInteraction,
  CommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
} from "discord.js";
import { DisTube, Queue } from "distube";

export default {
  data: new SlashCommandBuilder()
    .setName("queue")
    .setDescription("Shows the queue"),

  async execute(interaction: any, client: any) {
    if (!interaction.member.voice.channel)
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

    const queue = await client.distube!.getQueue(interaction.guildId);

    let currentlyPlaying = "-";
    let songsInQueue = "No songs in the queue.";

    if (!queue || !queue.songs) {
      currentlyPlaying = "-";
    } else {
      const currentSong = queue.songs[0];
      currentlyPlaying =
        "`[" +
        currentSong.formattedDuration +
        "]` " +
        currentSong.name +
        ` -- ${currentSong.member}`;

      if (queue.songs.length > 1) {
        songsInQueue = "";
        for (let i = 1; i < queue.songs.length; i++) {
          const song = queue.songs[i];
          if(i > 10) break;
          songsInQueue +=
            `${i}. ` +
            "`[" +
            song.formattedDuration +
            "]` " +
            song.name +
            ` -- ${song.member}\n`;
        }
      }
    }

    const embed = new EmbedBuilder();

    embed
      .setColor("Purple")
      .setThumbnail(queue ? queue.songs[0].thumbnail! : null)
      .setTimestamp()
      // .setDescription(description)
      .addFields(
        { name: "Currently playing", value: currentlyPlaying },
        { name: "Queue", value: songsInQueue },
        {
          name: "Duration",
          value: "`" + `${queue ? queue.formattedDuration : "-"}` + "`",
          inline: true,
        }
        // {
        //   name: "Filters",
        //   value: `${queue.filters ? queue.filters.names.join(", ") : "-"}`,
        //   inline: true,
        // }
      );

    await interaction.reply({
      embeds: [embed],
    });
  },
};
