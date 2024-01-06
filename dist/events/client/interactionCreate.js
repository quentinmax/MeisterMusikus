var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export default {
    name: "interactionCreate",
    execute(interaction, client) {
        return __awaiter(this, void 0, void 0, function* () {
            if (interaction.isCommand()) {
                const { commands } = client;
                const { commandName } = interaction;
                const command = commands.get(commandName);
                if (!command)
                    return;
                try {
                    yield command.execute(interaction, client);
                }
                catch (error) {
                    console.error(error);
                    yield interaction.reply({
                        content: `Oops! Looks like something went wrong while executing this command...`,
                        ephemeral: true,
                    });
                }
            }
            else if (interaction.isButton()) {
                const { buttons } = client;
                const { customId } = interaction;
                const button = buttons.get(customId);
                if (!button) {
                    console.error(`There is no code for this button!`);
                    return;
                }
                try {
                    yield button.execute(interaction, client);
                }
                catch (e) {
                    console.error(e);
                }
            }
        });
    },
};
