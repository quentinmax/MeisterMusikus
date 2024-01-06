import { EmbedBuilder } from "discord.js";
import {
  CacheType,
  ChatInputCommandInteraction,
  CommandInteractionOptionResolver,
  SlashCommandBuilder,
} from "discord.js";
import { Filter, Queue } from "distube";

const clearFilters = async (
  queue: Queue,
  interaction: ChatInputCommandInteraction
) => {
  queue.filters.clear();
  return await interaction.reply({
    embeds: [
      new EmbedBuilder().setDescription("Filters cleared.").setColor("Green"),
    ],
  });
};

const addFilter = async (
  queue: Queue,
  options: Omit<
    CommandInteractionOptionResolver<CacheType>,
    "getMessage" | "getFocused"
  >,
  interaction: ChatInputCommandInteraction
) => {
  const type = options.getString("type");

  if (
    type === "bassboost" ||
    type === "3d" ||
    type === "echo" ||
    type === "karaoke" ||
    type === "reverse"
  ) {
    queue.filters.add(type);
  } else {
    switch (type) {
      case "robot":
        queue.filters.add({ name: "robot", value: "aecho=0.8:0.88:6:0.4" });
        break;

      default:
        queue.filters.add({ name: "bassboost", value: "bass=g=10" });
        break;
    }
  }
  await interaction.reply({
    embeds: [
      new EmbedBuilder()
        .setDescription(`**${type}** has been added.`)
        .setColor("Green"),
    ],
  });
};

const removeFilter = (
  queue: Queue,
  options: Omit<
    CommandInteractionOptionResolver<CacheType>,
    "getMessage" | "getFocused"
  >
) => {
  const type = options.getString("type");

  if (
    type === "bassboost" ||
    type === "3d" ||
    type === "echo" ||
    type === "karaoke" ||
    type === "reverse"
  ) {
    queue.filters.remove(type);
  } else {
    switch (type) {
      case "robot":
        queue.filters.remove({ name: "robot", value: "aecho=0.8:0.88:6:0.4" });
        break;

      default:
        queue.filters.remove({ name: "bassboost", value: "bass=g=10" });
        break;
    }
  }
};

export default {
  data: new SlashCommandBuilder()
    .setName("filters")
    .setDescription("Lets you add filters like bassboost to your music.")
    .addSubcommand((command) =>
      command.setName("clear").setDescription("Clear all filters")
    )
    .addSubcommand((command) =>
      command
        .setName("add")
        .setDescription("Add a filter")
        .addStringOption((option) =>
          option
            .setName("type")
            .setDescription("The type of filter")
            .setRequired(true)
            .addChoices(
              { name: "3d", value: "3d" },
              { name: "bassboost", value: "bassboost" },
              { name: "echo", value: "echo" },
              { name: "karaoke", value: "karaoke" },
              { name: "reverse", value: "reverse" },
              { name: "robot", value: "robot" }
            )
        )
    ),

  async execute(interaction: ChatInputCommandInteraction, client: any) {
    const queue: Queue = await client.distube.getQueue(interaction.guildId);
    const options = interaction.options;

    if (!queue) {
      return await interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription("No songs in the queue.")
            .setColor("Red"),
        ],
        ephemeral: true,
      });
    }

    switch (interaction.options.getSubcommand()) {
      case "clear":
        clearFilters(queue, interaction);
        break;
      case "add":
        addFilter(queue, options, interaction);
        break;
      case "remove":
        removeFilter(queue, options);
        break;
      default:
        break;
    }

    // const embed = new EmbedBuilder();

    // embed.setDescription("Added filter");

    // await interaction.reply({
    //   embeds: [embed],
    // });
  },
};
