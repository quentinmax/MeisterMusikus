var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import Genius from "genius-lyrics";
const Client = new Genius.Client(); // Scrapes if no key is provided
export default {
    data: new SlashCommandBuilder()
        .setName("lyrics")
        .setDescription("Find lyrics for the current playing or a specified song")
        .addStringOption((option) => option
        .setName("song")
        .setDescription("The song you want to get the lyrics for")
        .setRequired(false)),
    execute(interaction, client) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!interaction.member.voice.channel) {
                return interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription("Please join a voice channel in order to use this command.")
                            .setColor("Red"),
                    ],
                    ephemeral: true,
                });
            }
            const queue = yield client.distube.getQueue(interaction.guildId);
            const song = interaction.options.getString("song") || queue.songs[0].name;
            const searches = yield Client.songs.search(song);
            const lyrics = yield searches[0].lyrics();
            interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle("Lyrics for " + song)
                        .setDescription(lyrics),
                ],
            });
        });
    },
};
