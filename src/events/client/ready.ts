import {
  EmbedBuilder,
  Embed,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
} from "discord.js";

export default {
  name: "ready",
  once: true,
  async execute(client: any) {
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
  },
};
