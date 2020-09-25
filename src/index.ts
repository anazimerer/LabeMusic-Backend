import { musicRouter } from './routes/musicRouter';
import express from 'express'
import dotenv from 'dotenv'
import { AddressInfo } from "net";
import { userRouter } from "./routes/useRouter";
import { feedRouter } from './routes/feedRouter';
import cors from 'cors'


dotenv.config();
const app = express();

app.use(cors())

app.use(express.json());

app.use("/user", userRouter);
app.use("/music", musicRouter);
app.use("/feed", feedRouter)

const server = app.listen(3003, () => {
    if (server) {
        const address = server.address() as AddressInfo;
        console.log(`Servidor rodando em http://localhost:${address.port}`);
    } else {
        console.error(`Falha ao rodar o servidor.`);
    }
});