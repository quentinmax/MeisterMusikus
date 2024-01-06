var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { EmbedBuilder, SlashCommandBuilder, } from "discord.js";
export default {
    data: new SlashCommandBuilder()
        .setName("queue")
        .setDescription("Shows the queue"),
    execute(interaction, client) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!interaction.member.voice.channel)
                return interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription("Please join a voice channel in order to use this command.")
                            .setColor("Red"),
                    ],
                    ephemeral: true,
                });
            const queue = yield client.distube.getQueue(interaction.guildId);
            let currentlyPlaying = "-";
            let songsInQueue = "No songs in the queue.";
            if (!queue || !queue.songs) {
                currentlyPlaying = "-";
            }
            else {
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
                        if (i > 10)
                            break;
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
                .setThumbnail(queue ? queue.songs[0].thumbnail : null)
                .setTimestamp()
                // .setDescription(description)
                .addFields({ name: "Currently playing", value: currentlyPlaying }, { name: "Queue", value: songsInQueue }, {
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
            yield interaction.reply({
                embeds: [embed],
            });
        });
    },
};
