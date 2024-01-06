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
                return interaction.reply("Please join a voice channel to use this command.");
            const queue = yield client.distube.getQueue(interaction.guildId);
            let description = "";
            if (!queue || !queue.songs) {
                description = "No songs in the queue.";
            }
            else if (queue.songs.length) {
                description +=
                    `**Currently Playing**\n
        **${queue.songs[0].name}**` +
                        " | Requested by " +
                        `${queue.songs[0].member}` +
                        `${queue.songs.length > 1
                            ? "\n\n **Queue**\n"
                            : "\n\n **Queue**\nNo songs remaining."}`;
                for (let i = 1; i < queue.songs.length; i++) {
                    const song = queue.songs[i];
                    description +=
                        `${i}. ` + "`" + song.name + "`" + ` | Requested by ${song.member}\n`;
                }
            }
            const embed = new EmbedBuilder();
            embed
                .setColor("Purple")
                .setThumbnail(queue ? queue.songs[0].thumbnail : null)
                .setTimestamp()
                .setDescription(description)
                .addFields({
                name: "Duration",
                value: "`" + `${queue ? queue.formattedDuration : "-"}` + "`",
            });
            yield interaction.reply({
                embeds: [embed],
            });
            console.log(queue);
        });
    },
};
