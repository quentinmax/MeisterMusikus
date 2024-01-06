var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ButtonBuilder, ButtonStyle, } from "discord.js";
export default {
    name: "ready",
    once: true,
    execute(client) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`Online! ${client.user.tag} is logged in.`);
            const skipBtn = new ButtonBuilder()
                .setCustomId("skip-btn")
                .setLabel("Skip")
                .setStyle(ButtonStyle.Primary);
            const pauseBtn = new ButtonBuilder()
                .setCustomId("pause-btn")
                .setLabel("Pause")
                .setStyle(ButtonStyle.Primary);
            const playBtn = new ButtonBuilder()
                .setCustomId("play-btn")
                .setLabel("Play")
                .setStyle(ButtonStyle.Primary);
            // You can uncomment and use the following code as needed
            // client.channels.cache.get(client.musicChannelId).send({
            //   embeds: [new EmbedBuilder().setTitle(`Music Channel`)],
            //   components: [
            //     new ActionRowBuilder().addComponents(pauseBtn, playBtn, skipBtn),
            //   ],
            // });
        });
    },
};
