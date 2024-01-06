import { EmbedBuilder } from "discord.js";
import { Queue, Song } from "distube";

export default {
  name: "playSong",
  async execute(queue: Queue, song: Song) {
    const embed = new EmbedBuilder();
    embed
      .setColor("#35a3ff")
      .setTimestamp()
      .setTitle(":notes: Now playing :notes:")
      .setDescription(`[${song.name}](${song.url})`)
      .setThumbnail(song.thumbnail!)
      .addFields(
        {
          name: "Duration",
          value: "`" + `${song.formattedDuration} ` + "`",
          inline: true,
        },
        {
          name: "Requested by",
          value: `${song.member}`,
          inline: true,
        }
      );

    queue.textChannel?.send({
      embeds: [embed],
    });
  },
};
