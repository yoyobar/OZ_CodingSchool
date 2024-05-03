import express from 'express';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const port = 4000;

app.use(express.json());
// ? FORM내용 분석, 파싱
app.use(express.urlencoded({ extended: false }));

mongoose
    .connect(
        'mongodb+srv://barwait2615:GM6SeQKPUVuFVSVb@cluster0.yzldzsm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
    )
    .then(() => {
        console.log(`mongoDB connected`);
    })
    .catch((err) => {
        console.log(err);
    });

app.use('/static', express.static(join(__dirname, 'public')));

app.listen(port, () => {
    console.log(`Listening on ${port}`);
});
