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
import { SlashCommandBuilder, } from "discord.js";
const clearFilters = (queue, interaction) => __awaiter(void 0, void 0, void 0, function* () {
    queue.filters.clear();
    return yield interaction.reply({
        embeds: [
            new EmbedBuilder().setDescription("Filters cleared.").setColor("Green"),
        ],
    });
});
const addFilter = (queue, options, interaction) => __awaiter(void 0, void 0, void 0, function* () {
    const type = options.getString("type");
    if (type === "bassboost" ||
        type === "3d" ||
        type === "echo" ||
        type === "karaoke" ||
        type === "reverse") {
        queue.filters.add(type);
    }
    else {
        switch (type) {
            case "robot":
                queue.filters.add({ name: "robot", value: "aecho=0.8:0.88:6:0.4" });
                break;
            default:
                queue.filters.add({ name: "bassboost", value: "bass=g=10" });
                break;
        }
    }
    yield interaction.reply({
        embeds: [
            new EmbedBuilder()
                .setDescription(`**${type}** has been added.`)
                .setColor("Green"),
        ],
    });
});
const removeFilter = (queue, options) => {
    const type = options.getString("type");
    if (type === "bassboost" ||
        type === "3d" ||
        type === "echo" ||
        type === "karaoke" ||
        type === "reverse") {
        queue.filters.remove(type);
    }
    else {
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
        .addSubcommand((command) => command.setName("clear").setDescription("Clear all filters"))
        .addSubcommand((command) => command
        .setName("add")
        .setDescription("Add a filter")
        .addStringOption((option) => option
        .setName("type")
        .setDescription("The type of filter")
        .setRequired(true)
        .addChoices({ name: "3d", value: "3d" }, { name: "bassboost", value: "bassboost" }, { name: "echo", value: "echo" }, { name: "karaoke", value: "karaoke" }, { name: "reverse", value: "reverse" }, { name: "robot", value: "robot" }))),
    execute(interaction, client) {
        return __awaiter(this, void 0, void 0, function* () {
            const queue = yield client.distube.getQueue(interaction.guildId);
            const options = interaction.options;
            if (!queue) {
                return yield interaction.reply({
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
        });
    },
};
