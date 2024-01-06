var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { setTimeout } from "timers/promises";
export default {
    data: new SlashCommandBuilder()
        .setName("skip")
        .setDescription("Skips the current song"),
    execute(interaction, client) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!interaction.member.voice.channel)
                return interaction.reply("Please join a voice channel to use this command.");
            const queue = yield client.distube.getQueue(interaction.guildId);
            let description = "";
            if (!queue || !queue.songs) {
                description = "Nothing to skip.";
            }
            else if (queue.songs.length > 1) {
                client.distube.skip(interaction.guildId);
            }
            else if (queue.songs.length === 1) {
                console.log("Stoppping");
                client.distube.stop(interaction.guildId);
            }
            const embed = new EmbedBuilder();
            embed
                .setColor("Blue")
                .setDescription(description
                ? description
                : `Skipped **${queue.songs[0].name}**. :track_next:`);
            yield interaction.reply({
                embeds: [embed],
            });
            yield setTimeout(2500);
            yield interaction.deleteReply();
        });
    },
};
