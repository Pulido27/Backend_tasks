import express, { json } from "express";
import authRoutes from './routes/auth.routes.js';
import taskRoutes from './routes/task.routes.js';
import errorHandler from "./middlewares/error.middleware.js";

const app = express();

app.disable("x-powered-by");

app.use(json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

app.get('/healt',(req, res) => {
    res.json({
        status: "ok"
    });
});

app.use(errorHandler);

export default app;