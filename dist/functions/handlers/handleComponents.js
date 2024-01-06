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
    const components = yield readdirSync(`./src/components`);
    for (const folder of components) {
        const componentFiles = yield readdirSync(`./src/components/${folder}`).filter((file) => file.endsWith(".js"));
        // You can continue processing componentFiles here
    }
});
