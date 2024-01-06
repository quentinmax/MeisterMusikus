var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { readdirSync } from "fs"; // Use fs/promises to work with promises
export default (client) => __awaiter(void 0, void 0, void 0, function* () {
    const isProduction = process.env.NODE_ENV === "production";
    const path = isProduction ? "./dist" : "./src";
    const eventFolders = yield readdirSync(`${path}/events`);
    for (const folder of eventFolders) {
        const eventFiles = yield readdirSync(`${path}/events/${folder}`).filter((file) => file.endsWith(isProduction ? ".js" : ".ts"));
        switch (folder) {
            case "client":
                for (const file of eventFiles) {
                    const event = yield import(`../../events/${folder}/${file}`);
                    if (event.default.once) {
                        // console.log(event.default);
                        client.once(event.default.name, (...args) => event.default.execute(...args, client));
                    }
                    else
                        client.on(event.default.name, (...args) => event.default.execute(...args, client));
                }
                break;
            case "distube":
                for (const file of eventFiles) {
                    const event = yield import(`../../events/${folder}/${file}`);
                    client.distube.on(event.default.name, (...args) => event.default.execute(...args, client));
                }
            default:
                break;
        }
    }
});
