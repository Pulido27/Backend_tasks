import express, { json } from "express";
import authRoutes from './routes/auth.routes.js';

const app = express();

app.disable("x-powered-by");

app.use(json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRoutes);

app.get('/healt',(req, res) => {
    res.json({
        status: "ok"
    });
});

app.get('/ping', (req, res) => {
    res.json({message: "pong"})
})

export default app;