import {
  SlashCommandBuilder,
  EmbedBuilder,
  Client,
  Collection,
  CommandInteraction,
  Interaction,
} from "discord.js";
import { RawCommandInteractionData } from "discord.js/typings/rawDataTypes.js";
import { DisTube, SearchResultType } from "distube";
import { setTimeout } from "timers/promises";

interface BotClient extends Client {
  distube?: DisTube;
  commands?: Collection<unknown, unknown>;
  commandArray?: Array<Collection<unknown, unknown>>;
  color?: string;
  buttons?: Collection<unknown, unknown>;
  aliases?: Collection<unknown, unknown>;
  handleEvents?: Function;
  handleCommands?: Function;
  handleComponents?: Function;
}

export default {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Plays the provided song or adds it to the queue.")
    .addStringOption((option) =>
      option
        .setName("search")
        .setDescription("The song's name / URL")
        .setRequired(true)
    ),

  async execute(interaction: any, client: BotClient) {
    if (!interaction.member.voice.channel)
      return interaction.reply(
        "Please join a voice channel to use this command."
      );

    const url = interaction.options.getString("search");

    const song = await client.distube?.search(url, {
      type: SearchResultType.VIDEO,
    });

    client.distube!.play(interaction.member.voice.channel, song![0], {
      textChannel: interaction.channel,
      member: interaction.member,
    });
    // const current = client.distube?.getQueue(interaction)!.songs[0];

    const embed = new EmbedBuilder();
    embed
      // .setTitle(`Now playing **${current!.name}**`)
      .setColor("Green")
      .setDescription(
        "`" +
          `${song![0].name}` +
          "` has been added to the queue! :white_check_mark:"
      );

    await interaction.reply({
      embeds: [embed],
    });

    await setTimeout(2500);
    await interaction.deleteReply();
  },
};
