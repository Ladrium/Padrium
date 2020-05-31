import { PadClient } from "../Lib";
import express from "express";
import cors from "cors";
import { json } from "body-parser";

export = (bot: PadClient) => {
    const app = express();

    // @ts-ignore
    app.use(cors());
    app.use(json());

    app.get("/", (req, res) => {
        res.send("<h1>How</h1>");
    });
    app.listen(3000, () => console.log("Server started on port 3000!"));
};
