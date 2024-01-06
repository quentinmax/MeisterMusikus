var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { SlashCommandBuilder, EmbedBuilder, } from "discord.js";
import { SearchResultType } from "distube";
import { setTimeout } from "timers/promises";
export default {
    data: new SlashCommandBuilder()
        .setName("play")
        .setDescription("Plays the provided song or adds it to the queue.")
        .addStringOption((option) => option
        .setName("search")
        .setDescription("The song's name / URL")
        .setRequired(true)),
    execute(interaction, client) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!interaction.member.voice.channel)
                return interaction.reply("Please join a voice channel to use this command.");
            const url = interaction.options.getString("search");
            const song = yield ((_a = client.distube) === null || _a === void 0 ? void 0 : _a.search(url, {
                type: SearchResultType.VIDEO,
            }));
            client.distube.play(interaction.member.voice.channel, song[0], {
                textChannel: interaction.channel,
                member: interaction.member,
            });
            // const current = client.distube?.getQueue(interaction)!.songs[0];
            const embed = new EmbedBuilder();
            embed
                // .setTitle(`Now playing **${current!.name}**`)
                .setColor("Green")
                .setDescription("`" +
                `${song[0].name}` +
                "` has been added to the queue! :white_check_mark:");
            yield interaction.reply({
                embeds: [embed],
            });
            yield setTimeout(2500);
            yield interaction.deleteReply();
        });
    },
};
