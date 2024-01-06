import { Interaction } from "discord.js";

export default {
  name: "interactionCreate",
  async execute(interaction: Interaction, client: any) {
    if (interaction.isCommand()) {
      const { commands } = client;
      const { commandName } = interaction;
      const command = commands.get(commandName);
      if (!command) return;

      try {
        await command.execute(interaction, client);
      } catch (error) {
        console.error(error);
        await interaction.reply({
          content: `Oops! Looks like something went wrong while executing this command...`,
          ephemeral: true,
        });
      }
    } else if (interaction.isButton()) {
      const { buttons } = client;
      const { customId } = interaction;
      const button = buttons.get(customId);
      if (!button) {
        console.error(`There is no code for this button!`);
        return;
      }

      try {
        await button.execute(interaction, client);
      } catch (e) {
        console.error(e);
      }
    }
  },
};
