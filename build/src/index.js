"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const musicRouter_1 = require("./routes/musicRouter");
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const useRouter_1 = require("./routes/useRouter");
const feedRouter_1 = require("./routes/feedRouter");
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json());
app.use("/user", useRouter_1.userRouter);
app.use("/music", musicRouter_1.musicRouter);
app.use("/feed", feedRouter_1.feedRouter);
const server = app.listen(3003, () => {
    if (server) {
        const address = server.address();
        console.log(`Servidor rodando em http://localhost:${address.port}`);
    }
    else {
        console.error(`Falha ao rodar o servidor.`);
    }
});
