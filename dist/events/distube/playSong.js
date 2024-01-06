var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { EmbedBuilder } from "discord.js";
export default {
    name: "playSong",
    execute(queue, song) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const embed = new EmbedBuilder();
            embed
                .setColor("#35a3ff")
                .setTimestamp()
                .setTitle(":notes: Now playing :notes:")
                .setDescription(`[${song.name}](${song.url})`)
                .setThumbnail(song.thumbnail)
                .addFields({
                name: "Duration",
                value: "`" + `${song.formattedDuration} ` + "`",
                inline: true,
            }, {
                name: "Requested by",
                value: `${song.member}`,
                inline: true,
            });
            (_a = queue.textChannel) === null || _a === void 0 ? void 0 : _a.send({
                embeds: [embed],
            });
        });
    },
};
